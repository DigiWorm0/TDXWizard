import DateTime from "../../tdx-api/types/DateTime";
import FeedProfileImage from "./FeedProfileImage";
import React from "react";
import Guid from "../../tdx-api/types/Guid";
import removeHTMLTags, {replaceHTMLEntities} from "../../utils/removeHTMLTags";
import useUserColor from "../../hooks/useUserColor";
import useJumpToFeedID from "../../hooks/useJumpToFeed";
import UpdatedTimestamp from "../utils/UpdatedTimestamp";
import {Interweave} from "interweave";
import AttachmentsMatcher from "../../utils/AttachmentsMatcher";
import Attachment from "../../tdx-api/types/Attachment";

export interface TicketFeedCommunicationProps {
    id: number,
    uid: Guid,
    name: string,
    date: DateTime,
    isRequester: boolean,
    body: string,
    label?: string,
    notifiedList: string,
    ticketAttachments?: Attachment[],

    replyToID?: number,
    replyToUID?: Guid,
    replyToName?: string,
    replyToBody?: string,
}

export default function FeedCommunication(props: TicketFeedCommunicationProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [targetFeedID, jumpToFeedID] = useJumpToFeedID();
    const userColor = useUserColor(props.uid);
    const replyUserColor = useUserColor(props.replyToUID ?? "");
    const profileURL = `/TDNext/Apps/People/PersonDet.aspx?U=${props.uid}`;

    const isTargetFeed = targetFeedID === props.id;

    React.useEffect(() => {
        if (!isTargetFeed)
            return;
        if (!containerRef.current)
            return;

        // Scroll to the feed
        containerRef.current.scrollIntoView({behavior: "smooth", block: "center"});

        // Remove the target feed ID after 2 seconds
        const timeout = setTimeout(() => {
            jumpToFeedID(undefined);
        }, 1500);
        return () => clearTimeout(timeout);
    }, [isTargetFeed, props.id]);

    const openProfile = (e: React.MouseEvent<HTMLAnchorElement>) => {
        window.open(
            profileURL,
            "Profile",
            "width=992,height=700"
        );
        e.preventDefault();
    }

    return (
        <div className={"w-100"} ref={containerRef}>
            {props.replyToID && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexGrow: 1,
                        alignItems: "center",
                        opacity: 0.8,
                        paddingLeft: 50,
                        cursor: "pointer"
                    }}
                    className={"w-100"}
                    onClick={() => jumpToFeedID(props.replyToID)}
                >
                    <span
                        className={"fa fa-arrow-turn-down"}
                        style={{color: "#aaa", transform: "scaleX(-1) translateY(2px)"}}
                    />
                    <FeedProfileImage
                        name={props.replyToName ?? ""}
                        color={replyUserColor}
                        size={16}
                    />
                    <h6
                        style={{
                            fontWeight: "bold",
                            margin: 0,
                            paddingLeft: 3,
                            color: replyUserColor,
                            whiteSpace: "nowrap"
                        }}
                    >
                        {props.replyToName}
                    </h6>
                    <p
                        style={{
                            margin: "0px 10px",
                            color: "#aaa",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            maxWidth: "100%"
                        }}
                    >
                        {replaceHTMLEntities(removeHTMLTags(props.replyToBody ?? ""))}
                    </p>
                </div>
            )}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    paddingLeft: 10,
                    paddingTop: 10,
                    paddingBottom: 5,
                    backgroundColor: isTargetFeed ? "#fffcee" : "transparent",
                    borderRadius: 15,
                    transition: "background-color 0.5s"
                }}
            >
                <FeedProfileImage
                    size={60}
                    uid={props.uid}
                    name={props.name}
                    href={profileURL}
                    color={userColor}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        paddingLeft: 10
                    }}
                >
                    <h5
                        style={{
                            fontWeight: "bold",
                            margin: 0
                        }}
                    >
                        <a
                            href={profileURL}
                            onClick={openProfile}
                            style={{
                                textDecoration: "none",
                                color: userColor
                            }}
                        >
                            {props.name}
                        </a>
                        {props.isRequester && (
                            <span
                                title={"Requester"}
                                className={"fa fa-star"}
                                style={{
                                    color: userColor,
                                    marginLeft: 4
                                }}
                            />
                        )}

                        {props.label && (
                            <span style={{color: "#888", marginLeft: 4, fontSize: 12}}>
                                {props.label}
                            </span>
                        )}
                        <span style={{color: "#aaa", fontWeight: "normal", marginLeft: 4, fontSize: 12}}>
                            <UpdatedTimestamp
                                date={props.date}
                            />
                        </span>
                    </h5>
                    <p style={{margin: "5px 0px"}}>
                        <Interweave
                            content={props.body}
                            matchers={[
                                new AttachmentsMatcher(props.ticketAttachments ?? [])
                            ]}
                        />
                    </p>
                    {props.notifiedList && (
                        <p
                            style={{
                                marginTop: 3,
                                marginBottom: 0,
                                color: "#aaa",
                                fontSize: 12
                            }}
                        >
                            Notified: {props.notifiedList}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}