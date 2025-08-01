import FeedItemUpdate from "../tdx-api/types/FeedItemUpdate";
import React from "react";
import DefaultGUID from "../types/DefaultGUID";
import {replaceHTMLEntities} from "../utils/removeHTMLTags";
import FeedItemType from "../tdx-api/types/FeedItemType";
import getEpochFromDateTime from "../utils/datetime/getEpochFromDateTime";
import useSettings from "./useSettings";
import DateTime from "../tdx-api/types/DateTime";
import UserOperationMatches from "../db/UserOperationMatches";

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

const TASK_COMPLETED_REGEX = /Changed Percent Complete from "\d+ %" to "100 %"./g;
const WEB_SERVICE_COMPLETED_REGEX = /The web service call for the "(.*?)" step in the ".*?" workflow completed successfully\.<br ?\/?>/g;
const MERGED_REGEXES = [
    /\[Merged from ticket (\d+)(?:, .+)?]<br ?\/?><br ?\/?>/g,
    /Merged (?:incident|service request) (\d+) /g
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
        if (!feed)
            return null;
        if (feed.length === 0)
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
            UserOperationMatches.forEach(regex => {
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

                        // Add the new item
                        newItems.push({
                            ...item,
                            ID: Math.random(),
                            IsCommunication: false,
                            Body: match,
                        });
                        newItems[i] = {
                            ...item,
                            Body: content.replace(match, ""),
                        };
                    }
                }
            });
        }

        // Rewrite overly complex system messages
        for (const item of newItems) {

            // Skip if it's a communication
            if (item.IsCommunication)
                continue;

            // Replace task completed percentage with a checkmark
            TASK_COMPLETED_REGEX.lastIndex = 0;
            const isTaskCompleted = TASK_COMPLETED_REGEX.test(item.Body);
            const isTicketTask = item.ItemType === FeedItemType.TicketTask;

            if (isTaskCompleted &&
                isTicketTask &&
                settings.checkForTicketTaskCompletions
            ) {
                item.Body = `${item.ItemTitle} <span class="fa fa-sm fa-check"></span><br>`;
                continue;
            }

            // Replace web service completion messages with a checkmark
            WEB_SERVICE_COMPLETED_REGEX.lastIndex = 0;
            const webServiceMatch = WEB_SERVICE_COMPLETED_REGEX.exec(item.Body);

            if (webServiceMatch &&
                settings.checkForTicketTaskCompletions
            ) {
                item.Body = `${webServiceMatch[1]} <span class="fa fa-sm fa-check"></span><br>`;
                continue;
            }

            // Append Task Name if it's a Ticket Task
            if (isTicketTask && settings.checkForTicketTasks)
                item.Body = `${item.ItemTitle} > ` + item.Body;
        }

        // Replace \n with <br>
        newItems = newItems.map(item => ({
            ...item,
            Body: item.Body.replace(/\n/g, "<br>")
        }));

        // Remove extra <br> tags
        const DOUBLE_BR_REGEX = /<br ?\/?><br ?\/?>/g;
        const STARTING_BR_REGEX = /^\s*?<br ?\/?>/g;
        const ENDING_BR_REGEX = /<br ?\/?>\s*?$/g;
        const HORIZONTAL_RULE_REGEX = /<hr ?\/?>/g;

        newItems.forEach(item => {
            if (!item.IsCommunication) {
                // Reduce double <br> tags
                item.Body = item.Body.replace(DOUBLE_BR_REGEX, "<br>");
            } else {
                // Remove starting/ending <br> tags and horizontal rules
                item.Body = item.Body.replace(STARTING_BR_REGEX, "");
                item.Body = item.Body.replace(ENDING_BR_REGEX, "");
                item.Body = item.Body.replace(HORIZONTAL_RULE_REGEX, "");
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
    }, [feed, settings]);
}