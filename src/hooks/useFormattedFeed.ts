import FeedItemUpdate from "../tdx-api/types/FeedItemUpdate";
import React from "react";
import DefaultGUID from "../types/DefaultGUID";
import {replaceHTMLEntities} from "../utils/removeHTMLTags";
import FeedItemType from "../tdx-api/types/FeedItemType";
import getEpochFromDateTime from "../utils/datetime/getEpochFromDateTime";
import useSettings from "./useSettings";
import DateTime from "../tdx-api/types/DateTime";

interface FormattedFeedItem {
    ID: number;
    CreatedUid: string;
    CreatedFullName: string;
    CreatedDate: DateTime;
    Body: string;
    IsCommunication?: boolean;
    IsPrivate?: boolean;
    IsEmailMonitor?: boolean;
    ReplyToID?: number;
    NotifiedList: string;

    ItemType?: FeedItemType;
    ItemTitle?: string;

    MergedTicketID?: string; // Optional, used for merged tickets
}

const MAX_TIME_OFFSET = 1000 * 60 * 60 * 24; // 24 hours
const COMPLETED_REGEX = /Changed Percent Complete from "\d+ %" to "100 %"./g;
const MERGED_REGEXES = [
    /\[Merged from ticket (\d+)]<br ?\/?><br ?\/?>/g,
    /Merged (?:incident|service request) (\d+) /g
];

const USER_OPERATION_REGEXES = [
    new RegExp(/Changed .* from <b>.*?<\/b> to <b>.*?<\/b>\.<br ?\/?>/g),
    new RegExp(/Changed .* from ".*?" to ".*?"\.<br ?\/?>/g),
    new RegExp(/Selected ".*" for the ".*?" step in the ".*?" workflow\.<br ?\/?>/g),
    new RegExp(/Took primary responsibility for this (?:incident|service request) from .*?\.<br ?\/?>/g),
    new RegExp(/Reassigned this (?:incident|service request) from .*? to .*?\.<br ?\/?>/g),
    new RegExp(/Added the ".*?" asset to this (?:incident|service request)\.<br ?\/?>/g),
    new RegExp(/Removed the ".*?" asset from this (?:incident|service request)\.<br ?\/?>/g),
    new RegExp(/Added this asset to the ".*?" (?:incident|service request) \(ID: \d+\)\.<br ?\/?>/g),
    new RegExp(/Added .* as a contact for this (?:incident|service request)\.<br ?\/?>/g),
    new RegExp(/Automatically completed as a result of the (?:incident|service request) being closed.<br ?\/?>/g),
    new RegExp(/Assigned the ".*?" workflow to this (?:incident|service request)\.<br ?\/?>/g),
    new RegExp(/Removed the ".*?" workflow from this (?:incident|service request)\.<br ?\/?>/g),
    new RegExp(/Added the .*? template to this (?:incident|service request)\.<br ?\/?>/g),
    new RegExp(/Restarted the ".*?" workflow for this (?:incident|service request)\.<br ?\/?>/g),
    new RegExp(/Took primary responsibility for this (?:incident|service request)\.<br ?\/?>/g),
    new RegExp(/Added the attachment .*?\.<br ?\/?>/g),
    new RegExp(/Edited this (?:incident|service request|task)\.<br ?\/?>/g),
];

/**
 * Takes a feed and formats it to be used in the BetterFeed component.
 *
 * This includes:
 * - Separate system messages from communications
 * - Replace replies with dedicated feed items
 * - Checking for merged tickets
 * - Checking for tasks and completions
 * - Merging adjacent system messages
 *
 * @param feed
 */
export default function useFormattedFeed(feed: FeedItemUpdate[] | null | undefined) {
    const [settings] = useSettings();

    return React.useMemo(() => {
        // Abort if no feed is provided
        if (!feed || feed.length === 0)
            return [];

        // Create a new array of formatted feed items
        let newItems: FormattedFeedItem[] = feed.map(item => ({
            ...item,
            Body: item.Body ?? "",  // <-- Ensure all items have a body
        }));

        // Replace replies with dedicated feed items
        feed?.forEach(item => {
            item?.Replies?.forEach(reply => {
                newItems.push({
                    ...reply,
                    NotifiedList: item.NotifiedList,
                    ReplyToID: item.ID
                });
            });
        });

        // Mark system messages as non-communication and vice versa
        newItems = newItems.map(item => ({
            ...item,
            IsCommunication: item.CreatedUid != DefaultGUID
        }));

        // Add <br> tags to the end of each message
        newItems = newItems.map(item => ({
            ...item,
            Body: item.Body + "<br>"
        }));

        // Replace HTML character entities with their respective characters
        // for the purpose of analyzing the body w/ regex
        newItems = newItems.map(item => ({
            ...item,
            Body: replaceHTMLEntities(item.Body)
        }));

        // Check for Merged Tickets
        if (settings.checkForMergedTickets) {   // <-- (enabled by default)
            newItems = newItems.map(item => {
                for (const regex of MERGED_REGEXES) {
                    // Reset the regex lastIndex
                    regex.lastIndex = 0;

                    // Check if the body contains a merged ticket message
                    const matches = regex.exec(item.Body);
                    if (!matches)
                        continue;

                    // Get the merged ticket ID
                    const mergedTicketID = matches[1];
                    if (!mergedTicketID)
                        continue;

                    // Remove the merged ticket message from the body
                    return {
                        ...item,
                        Body: item.Body.replace(regex, ""),
                        MergedTicketID: mergedTicketID // Store the merged ticket ID
                    };
                }
                return item;
            });
        }

        // Replace specific user edits/operations with non-communication messages
        if (settings.checkForUserOperations) {  // <-- (enabled by default)
            USER_OPERATION_REGEXES.forEach(regex => {
                for (let i = 0; i < newItems.length; i++) {

                    // Array is mutated in place, so we need to fetch the item instead of using `forEach`
                    const item = newItems[i];

                    // Skip if it's already a non-communication
                    if (!item.IsCommunication)
                        continue;

                    // Remove LF from the field names
                    const content = item.Body.replace(/\n/g, " ");

                    // Reset the regex
                    regex.lastIndex = 0;

                    // Check if the body contains a system message
                    const matches = regex.exec(content);
                    if (!matches)
                        continue;

                    // Replace each match with a new item
                    for (let o = 0; o < matches?.length; o++) {
                        const match = matches[o];
                        if (!match)
                            continue;

                        let newMessage = match;

                        // Replace completed percentage with a checkmark
                        COMPLETED_REGEX.lastIndex = 0;
                        if (COMPLETED_REGEX.test(newMessage) && settings.checkForTicketTaskCompletions)
                            newMessage = `${item.ItemTitle} <span class="fa fa-sm fa-check"></span><br>`;

                        // Append Task Name if it's a Ticket Task
                        else if (item.ItemType === FeedItemType.TicketTask && settings.checkForTicketTasks)
                            newMessage = `${item.ItemTitle} > ` + newMessage;

                        // Add the new item
                        newItems.push({
                            ...item,
                            ID: Math.random(),
                            IsCommunication: false,
                            Body: newMessage,
                        });
                        newItems[i] = {
                            ...item,
                            Body: content.replace(match, ""),
                        };
                    }
                }
            });
        }

        // Replace \n with <br>
        newItems = newItems.map(item => ({
            ...item,
            Body: item.Body.replace(/\n/g, "<br>")
        }));

        // Remove extra <br> tags
        newItems.forEach(item => {
            if (!item.IsCommunication) {
                item.Body = item.Body.replace(/<br ?\/?><br ?\/?>/g, "<br>");
            } else {
                item.Body = item.Body.replace(/^\s*?<br ?\/?>/g, "");
                item.Body = item.Body.replace(/<br ?\/?>\s*?$/g, "");
                item.Body = item.Body.replace(/<hr ?\/?>/g, "");
            }
        });

        // Remove empty messages
        newItems = newItems.filter(item => item.Body.trim() !== "");

        // Sort the feed in chronological order (newest first)
        newItems.sort((a, b) => getEpochFromDateTime(b.CreatedDate) - getEpochFromDateTime(a.CreatedDate));

        // Reverse chronological order if the setting is enabled (disabled by default)
        if (settings.reverseFeedOrder)
            newItems = newItems.reverse();

        // Merge adjacent non-communication items if they meet the criteria
        for (let i = 0; i < newItems.length - 1; i++) {

            // Skip if either item is a communication
            if (newItems[i].IsCommunication || newItems[i + 1].IsCommunication)
                continue;

            // Skip if items are not from the same user
            if (newItems[i].CreatedUid !== newItems[i + 1].CreatedUid)
                continue;

            // Avoid merging if disabled in settings AND the items are different times
            const isSameTime = newItems[i].CreatedDate === newItems[i + 1].CreatedDate;
            if (!settings.mergeAdjacentSystemMessages && !isSameTime)
                continue;

            // Avoid merging if one is from a merged ticket and the other is not
            if (newItems[i].MergedTicketID !== newItems[i + 1].MergedTicketID)
                continue;

            // Avoid merging if the times too far apart (over 24 hours)
            const isSimilarTime = Math.abs(
                getEpochFromDateTime(newItems[i].CreatedDate) -
                getEpochFromDateTime(newItems[i + 1].CreatedDate)
            ) < MAX_TIME_OFFSET;
            if (!isSimilarTime)
                continue;

            // Merge the two items (newer on top)
            newItems[i].Body += newItems[i + 1].Body;   // Append the next item's body
            newItems.splice(i + 1, 1);                  // Remove the next item
            i--;                                        // Decrement i to account for the removed item
        }

        return newItems;
    }, [feed]);
}