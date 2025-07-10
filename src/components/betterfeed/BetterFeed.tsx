import FeedCommunication from "./FeedCommunication";
import FeedEvent from "./FeedEvent";
import useTicket from "../../hooks/useTicket";
import FeedItemUpdate from "../../tdx-api/types/FeedItemUpdate";
import useFormattedFeed from "../../hooks/useFormattedFeed";

export interface TicketFeedProps {
    feed: FeedItemUpdate[] | null | undefined;
}

export default function BetterFeed(props: TicketFeedProps) {
    const ticket = useTicket();
    const formattedFeed = useFormattedFeed(props.feed);

    return (
        <div
            style={{paddingTop: 5}}
            className={"wizard_betterfeed"}
        >
            {/* List each feed item */}
            {formattedFeed?.map(item => {

                // Find the "Reply To" item if it exists
                const replyTo = formattedFeed.find(i => i.ID === item.ReplyToID);

                return (
                    <div
                        key={item.ID}
                        className={"w-100"}
                    >
                        {/* Event Item */}
                        {!item.IsCommunication && (
                            <FeedEvent
                                uid={item.CreatedUid}
                                name={item.CreatedFullName}
                                date={item.CreatedDate}
                                body={item.Body ?? ""}
                                mergedTicketID={item.MergedTicketID}
                                ticketAttachments={ticket?.Attachments}
                            />
                        )}

                        {/* Communication Item */}
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

                                mergedTicketID={item.MergedTicketID}

                                replyToID={item.ReplyToID}
                                replyToUID={replyTo?.CreatedUid}
                                replyToName={replyTo?.CreatedFullName}
                                replyToBody={replyTo?.Body}
                            />
                        )}

                        {/* Divider */}
                        <hr style={{margin: 5, backgroundColor: "#eee"}}/>
                    </div>
                )
            })}

            {/* No Feed Items */}
            {formattedFeed?.length === 0 && (
                <div className={"text-center"}>
                    <span className={"text-muted"}>No feed items to display</span>
                </div>
            )}

            {/* Loading Animation */}
            {!formattedFeed && (
                <div className={"text-center"}>
                    <span
                        className={"fa fa-spinner fa-spin"}
                        style={{marginRight: 5}}
                    />
                    <span className={"text-muted"}>Loading feed...</span>
                </div>
            )}
        </div>
    )
}