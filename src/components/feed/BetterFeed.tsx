import React from "react";
import DateTime from "../../tdx-api/types/DateTime";
import getEpochFromDate from "../../utils/datetime/getEpochFromDate";
import FeedCommunication from "./FeedCommunication";
import FeedEvent from "./FeedEvent";
import useTicket from "../../hooks/useTicket";
import {replaceHTMLEntities} from "../../utils/removeHTMLTags";
import DefaultGUID from "../../types/DefaultGUID";
import useSettings from "../../hooks/useSettings";
import FeedItemUpdate from "../../tdx-api/types/FeedItemUpdate";

interface TicketFeedItem {
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
}

export interface TicketFeedProps {
    feed: FeedItemUpdate[] | null | undefined;
}

const MAX_TIME_OFFSET = 1000 * 60 * 60 * 24; // 24 hours

export default function BetterFeed(props: TicketFeedProps) {
    const {feed} = props;
    const ticket = useTicket();
    const [settings] = useSettings();

    const sortedFeed = React.useMemo(() => {
        let newItems: TicketFeedItem[] = [];

        // Convert the feed to the correct format
        feed?.forEach(item => {

            // Add the item to the new array
            newItems.push({
                ...item,
                Body: item.Body ?? ""
            });

            // Add the replies to the new array
            item?.Replies?.forEach(reply => {
                newItems.push({
                    ...reply,
                    NotifiedList: item.NotifiedList,
                    ReplyToID: item.ID
                });
            });
        });

        // Take Out System Messages
        newItems = newItems.map(item => ({
            ...item,
            IsCommunication: item.CreatedUid != DefaultGUID
        }));

        // Add <br> tags to the end of each message
        newItems = newItems.map(item => ({
            ...item,
            Body: item.Body + "<br>"
        }));

        // Replace Character Entities with their respective characters
        newItems = newItems.map(item => ({
            ...item,
            Body: replaceHTMLEntities(item.Body)
        }));

        // Replace System Messages with Non-Communication Messages
        const systemMessageRegex = [
            new RegExp(/Changed .* from <b>.*?<\/b> to <b>.*?<\/b>\.<br ?\/?>/g),
            new RegExp(/Changed .* from ".*?" to ".*?"\.<br ?\/?>/g),
            new RegExp(/Took primary responsibility for this (?:incident|service request) from .*?\.<br ?\/?>/g),
            new RegExp(/Reassigned this (?:incident|service request) from .*? to .*?\.<br ?\/?>/g),
            new RegExp(/\[Merged from ticket \d+]<br ?\/?><br ?\/?>/g),
            new RegExp(/Added the ".*?" asset to this (?:incident|service request)\.<br ?\/?>/g),
            new RegExp(/Removed the ".*?" asset from this (?:incident|service request)\.<br ?\/?>/g),
            new RegExp(/Added this asset to the ".*?" (?:incident|service request) \(ID: \d+\)\.<br ?\/?>/g),
            new RegExp(/Added .* as a contact for this (?:incident|service request)\.<br ?\/?>/g),
            new RegExp(/Automatically completed as a result of the (?:incident|service request) being closed.<br ?\/?>/g),
            new RegExp(/Assigned the ".*?" workflow to this (?:incident|service request)\.<br ?\/?>/g),
            new RegExp(/Removed the ".*?" workflow from this (?:incident|service request)\.<br ?\/?>/g),
            new RegExp(/Added the .*? template to this (?:incident|service request)\.<br ?\/?>/g),
            new RegExp(/Edited this task\.<br ?\/?>/g),
            new RegExp(/Restarted the ".*?" workflow for this (?:incident|service request)\.<br ?\/?>/g),
            new RegExp(/Took primary responsibility for this (?:incident|service request)\.<br ?\/?>/g),
            new RegExp(/Added the attachment .*?\.<br ?\/?>/g),
            // new RegExp(/Merged incident \d+ \(.*?\): /g),
        ];
        systemMessageRegex.forEach(regex => {
            for (let i = 0; i < newItems.length; i++) {
                const item = newItems[i];

                // Skip if it's already a non-communication
                if (!item.IsCommunication)
                    continue;

                // Remove LF from the field names
                const content = item.Body.replace(/\n/g, " ");

                // Check against the regex
                regex.lastIndex = 0;
                const matches = regex.exec(content);
                if (!matches)
                    continue;

                // Replace each match with a new item
                for (let o = 0; o < matches?.length; o++) {
                    const m = matches[o];
                    if (!m)
                        continue;

                    newItems.push({
                        ...item,
                        ID: Math.random(),
                        IsCommunication: false,
                        Body: m
                    });
                    newItems[i] = {
                        ...item,
                        Body: content.replace(m, ""),
                    };
                }
            }
        });

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

        // Remove Empty Messages
        newItems = newItems.filter(item => item.Body.trim() !== "");

        // Sort the feed by Date
        newItems.sort((a, b) => getEpochFromDate(b.CreatedDate) - getEpochFromDate(a.CreatedDate));
        if (settings.reverseFeedOrder)
            newItems = newItems.reverse();

        // Merge Non-Communication of the same user that are adjacent
        for (let i = 0; i < newItems.length - 1; i++) {

            // If the two items are not communications and are from the same user
            if (!newItems[i].IsCommunication &&
                !newItems[i + 1].IsCommunication &&
                newItems[i].CreatedFullName === newItems[i + 1].CreatedFullName
            ) {
                // Avoid merging if disabled in settings
                const isSameTime = newItems[i].CreatedDate === newItems[i + 1].CreatedDate;
                if (!settings.mergeAdjacentSystemMessages && !isSameTime)
                    continue;

                // Avoid merging if the times too far apart
                const isSimilarTime = Math.abs(
                    getEpochFromDate(newItems[i].CreatedDate) -
                    getEpochFromDate(newItems[i + 1].CreatedDate)
                ) < MAX_TIME_OFFSET; // 1 second
                if (!isSimilarTime)
                    continue;

                // Merge the two items (newer on top)
                newItems[i].Body += newItems[i + 1].Body;
                newItems.splice(i + 1, 1);
                i--;
            }

        }

        return newItems;
    }, [feed]);

    return (
        <div
            style={{paddingTop: 5}}
            className={"wizard_betterfeed"}
        >
            {sortedFeed?.map(item => {
                const replyTo = sortedFeed.find(i => i.ID === item.ReplyToID);

                return (
                    <div key={item.ID} className={"w-100"}>

                        {!item.IsCommunication && (
                            <FeedEvent
                                uid={item.CreatedUid}
                                name={item.CreatedFullName}
                                date={item.CreatedDate}
                                body={item.Body ?? ""}
                                ticketAttachments={ticket?.Attachments}
                            />
                        )}

                        {item.IsCommunication && (
                            <FeedCommunication
                                id={item.ID}
                                uid={item.CreatedUid}
                                name={item.CreatedFullName}
                                date={item.CreatedDate}
                                label={
                                    item.IsPrivate ? "(private)" :
                                        item.IsEmailMonitor ? "(emailmonitor)" :
                                            ""
                                }
                                isRequester={item.CreatedUid === ticket?.RequestorUid}
                                body={item.Body ?? ""}
                                notifiedList={item.NotifiedList}
                                ticketAttachments={ticket?.Attachments}

                                replyToID={item.ReplyToID}
                                replyToUID={replyTo?.CreatedUid}
                                replyToName={replyTo?.CreatedFullName}
                                replyToBody={replyTo?.Body}
                            />
                        )}

                        <hr style={{margin: 5, backgroundColor: "#eee"}}/>
                    </div>
                )
            })}

            {sortedFeed?.length === 0 && (
                <div className={"text-center"}>
                    <span className={"text-muted"}>No feed items to display</span>
                </div>
            )}

            {!sortedFeed && (
                <div className="progress">
                    <div
                        className={"progress progress-bar-striped progress-bar-animated"}
                        role={"progressbar"}
                        style={{width: "100%"}}
                    />
                </div>
            )}
        </div>
    )
}