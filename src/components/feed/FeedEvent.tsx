import dateToString from "../../utils/datetime/dateToString";
import getDateAgo from "../../utils/datetime/getDateAgo";
import DateTime from "../../tdx-api/types/DateTime";
import Guid from "../../tdx-api/types/Guid";
import React from "react";
import useUserColor from "../../hooks/useUserColor";
import DefaultGUID from "../../types/DefaultGUID";
import {Interweave} from "interweave";
import AttachmentsMatcher from "../../utils/AttachmentsMatcher";
import Attachment from "../../tdx-api/types/Attachment";

export interface TicketFeedEventProps {
    uid: Guid,
    name: string,
    date: DateTime,
    body: string,
    ticketAttachments?: Attachment[],
}

export default function FeedEvent(props: TicketFeedEventProps) {
    const userColor = useUserColor(props.uid);
    const profileURL = `/TDNext/Apps/People/PersonDet.aspx?U=${props.uid}`;

    const openProfile = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (props.uid === DefaultGUID)
            return;

        window.open(
            profileURL,
            "Profile",
            "width=992,height=700"
        );
    }

    return (
        <div
            title={dateToString(props.date) + " · " + getDateAgo(props.date)}
            style={{
                display: "flex",
                flexDirection: "row",
                padding: 5,
                marginLeft: 50,
            }}
        >
            <h5 style={{fontWeight: "bold", margin: "0px 5px", whiteSpace: "nowrap"}}>
                <span
                    className={"fa fa-solid fa-nopad fa-wrench"}
                    style={{
                        marginRight: 7,
                        color: userColor
                    }}
                />
                <a
                    href={profileURL}
                    onClick={openProfile}
                    style={{
                        color: userColor,
                        textDecoration: "none"
                    }}
                >
                    {props.name}:
                </a>
            </h5>
            <p
                style={{
                    margin: 0,
                    color: "#888",
                    paddingTop: 2
                }}
            >
                <Interweave
                    content={props.body}
                    matchers={[
                        new AttachmentsMatcher(props.ticketAttachments ?? [])
                    ]}
                />

            </p>
        </div>
    )
}