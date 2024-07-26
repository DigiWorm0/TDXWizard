import useTicketFeed from "../../hooks/useTicketFeed";
import React from "react";
import DateTime from "../../tdx-api/types/DateTime";
import getEpochFromDate from "../../utils/datetime/getEpochFromDate";
import TicketFeedCommunication from "../feed/TicketFeedCommunication";
import TicketFeedEvent from "../feed/TicketFeedEvent";
import useTicket from "../../hooks/useTicket";

interface TicketFeedItem {
    ID: number;
    CreatedUid: string;
    CreatedFullName: string;
    CreatedDate: DateTime;
    Body?: string;
    IsCommunication?: boolean;
    IsPrivate?: boolean;
    NotifiedList: string;
}

export default function TicketFeed() {
    const feed = useTicketFeed();
    const ticket = useTicket();

    const sortedFeed = React.useMemo(() => {
        let newItems: TicketFeedItem[] = [];

        // Convert the feed to the correct format
        feed?.forEach(item => {

            // Add the item to the new array
            newItems.push(item);

            // Add the replies to the new array
            item?.Replies?.forEach(reply => {
                newItems.push({
                    ...reply,
                    IsCommunication: true,
                    NotifiedList: item.NotifiedList
                });
            });
        });

        // Take Out System Messages
        newItems = newItems.map(item => ({
            ...item,
            IsCommunication: item.IsCommunication && item.CreatedFullName !== "System"
        }));

        // Add <br> tags to the end of each message
        newItems = newItems.map(item => ({
            ...item,
            Body: item.Body ? item.Body + "<br>" : item.Body
        }));

        // Replace Character Entities with their respective characters
        newItems = newItems.map(item => ({
            ...item,
            Body: item.Body?.replace(/&quot;/g, "\"")
        }));

        // Replace System Messages with Non-Communication Messages
        const systemMessageRegex = [
            new RegExp(/Changed .* from <b>.*?<\/b> to <b>.*?<\/b>\.<br\/?>/g),
            new RegExp(/Changed .* from ".*?" to ".*?"\.<br\/?>/g),
            new RegExp(/Took primary responsibility for this incident from .*?\.<br\/?>/g),
            new RegExp(/Reassigned this incident from .*? to .*?\.<br\/?>/g),
        ];
        systemMessageRegex.forEach(regex => {
            for (let i = 0; i < newItems.length; i++) {
                const item = newItems[i];
                if (!item.IsCommunication)
                    continue;

                const matches = regex.exec(item.Body ?? "");
                if (!matches) {

                    console.log({
                        regex: regex.source,
                        name: item.CreatedFullName,
                        body: item.Body,
                        matches,
                    });
                    continue;
                }

                for (let o = 0; o < matches?.length; o++) {
                    const m = matches[o];
                    newItems.push({
                        ...item,
                        ID: Math.random(),
                        IsCommunication: false,
                        Body: m
                    });
                    newItems[i] = {
                        ...item,
                        Body: item.Body?.replace(m, ""),
                    };
                }
            }
        });

        // Remove extra <br> tags
        newItems.forEach(item => {
            if (!item.IsCommunication) {
                item.Body = item.Body?.replace(/<br><br>/g, "<br>");
            } else {
                item.Body = item.Body?.replace(/^\s*<br>/g, "");
                item.Body = item.Body?.replace(/<br>\s*$/g, "");
                item.Body = item.Body?.replace(/<hr.*?>/g, "");
            }
        });

        // Remove Empty Messages
        newItems = newItems.filter(item => item.Body?.trim() !== "");

        // Sort the feed by Date
        newItems.sort((a, b) => getEpochFromDate(b.CreatedDate) - getEpochFromDate(a.CreatedDate));

        // Merge Non-Communication of the same user that are adjacent
        for (let i = 0; i < newItems.length - 1; i++) {
            if (!newItems[i].IsCommunication && !newItems[i + 1].IsCommunication && newItems[i].CreatedFullName === newItems[i + 1].CreatedFullName) {
                newItems[i].Body += newItems[i + 1].Body ?? "";
                newItems.splice(i + 1, 1);
                i--;
            }
        }

        return newItems;
    }, [feed]);

    return sortedFeed?.map(item => (
        <div key={item.ID}>

            {!item.IsCommunication && (
                <TicketFeedEvent
                    name={item.CreatedFullName}
                    date={item.CreatedDate}
                    body={item.Body ?? ""}
                />
            )}

            {item.IsCommunication && (
                <TicketFeedCommunication
                    uid={item.CreatedUid}
                    name={item.CreatedFullName}
                    date={item.CreatedDate}
                    isPrivate={item.IsPrivate ?? false}
                    isRequester={item.CreatedUid === ticket?.RequestorUid}
                    body={item.Body ?? ""}
                    notifiedList={item.NotifiedList}
                />
            )}

            <hr style={{margin: 5}}/>
        </div>
    ));
}