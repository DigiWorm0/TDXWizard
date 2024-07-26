import useTicketFeed from "../../hooks/useTicketFeed";
import React from "react";
import DateTime from "../../tdx-api/types/DateTime";

interface TicketFeedItem {
    ID: number;
    CreatedUid: string;
    CreatedFullName: string;
    CreatedDate: DateTime;
    Body?: string;
    IsCommunication?: boolean;
    IsPrivate?: boolean;
}

function getEpochFromDate(date: DateTime): number {
    return (new Date(date)).getTime();
}

function dateToString(date: DateTime): string {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}

function dateAgo(date: DateTime): string {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0)
        return months + " months ago";
    if (days > 0)
        return days + " days ago";
    if (hours > 0)
        return hours + " hours ago";
    if (minutes > 0)
        return minutes + " minutes ago";
    if (seconds > 0)
        return seconds + " seconds ago";
    return "just now";
}

export default function TicketFeed() {
    const feed = useTicketFeed();

    const sortedFeed = React.useMemo(() => {
        let newItems: TicketFeedItem[] = [];

        // Convert the feed to the correct format
        feed?.forEach(item => {

            // Add the item to the new array
            newItems.push(item);

            // Add the replies to the new array
            item?.Replies?.forEach(reply => {
                newItems.push({...reply, IsCommunication: true});
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

    console.log(sortedFeed);

    return sortedFeed?.map(item => (
        <div key={item.ID}>
            {!item.IsCommunication && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        color: "#aaa",
                        padding: 5
                    }}
                >
                    <h5 style={{fontWeight: "bold", margin: "0px 5px", whiteSpace: "nowrap"}}>
                        <span className={"fa fa-solid fa-nopad fa-wrench"} style={{marginRight: 7}}/>
                        <span>
                            {item.CreatedFullName}:
                        </span>
                    </h5>
                    <p
                        style={{margin: 0}}
                        dangerouslySetInnerHTML={{__html: item.Body ?? ""}}
                    />
                </div>
            )}
            {item.IsCommunication && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexGrow: 1,
                        padding: "10px",
                    }}
                >
                    <div>
                        <div
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 10,
                                backgroundColor: "#218de8",
                                color: "#fff",
                                fontWeight: "bold",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 30,
                                marginRight: 10
                            }}
                            onClick={() => console.log(item)}
                        >
                            <span>
                                {item.CreatedFullName[0]}
                            </span>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <h5
                            style={{
                                fontWeight: "bold",
                                color: "#218de8",
                                margin: 0
                            }}
                        >
                            {item.CreatedFullName}
                            {item.IsPrivate && (
                                <span style={{color: "#888", marginLeft: 4, fontSize: 12}}>
                                    (private)
                                </span>
                            )}
                            <span style={{color: "#aaa", fontWeight: "normal", marginLeft: 4, fontSize: 12}}>
                                {dateToString(item.CreatedDate)}
                                {" · "}
                                {dateAgo(item.CreatedDate)}
                            </span>
                        </h5>
                        <p
                            style={{
                                margin: "5px 0px"
                            }}
                            dangerouslySetInnerHTML={{__html: item.Body ?? ""}}
                        />
                    </div>
                </div>
            )}

            <hr style={{margin: 5}}/>
        </div>
    ));
}