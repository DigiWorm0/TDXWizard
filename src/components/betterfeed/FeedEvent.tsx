import dateTimeToString from "../../utils/datetime/dateTimeToString";
import getDateTimeAgo from "../../utils/datetime/getDateTimeAgo";
import DateTime from "../../tdx-api/types/DateTime";
import Guid from "../../tdx-api/types/Guid";
import React from "react";
import useUserColor from "../../hooks/useUserColor";
import DefaultGUID from "../../types/DefaultGUID";
import openWindow from "../../utils/openWindow";
import FeedRenderer from "./FeedRenderer";
import useDarkMode from "../../hooks/useDarkMode";

export interface TicketFeedEventProps {
    uid: Guid,
    name: string,
    date: DateTime,
    body: string,
    mergedTicketID?: string,
}

export default function FeedEvent(props: TicketFeedEventProps) {
    const userColor = useUserColor(props.uid);
    const isSystem = props.uid === DefaultGUID;
    const profileURL = isSystem ? "#" : `/TDNext/Apps/People/PersonDet.aspx?U=${props.uid}`;
    const isDarkMode = useDarkMode();

    const openProfile = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (isSystem)
            return;

        openWindow(profileURL, `Profile of ${props.name}`, false);
    }

    return (
        <div
            title={dateTimeToString(props.date) + " · " + getDateTimeAgo(props.date)}
            style={{
                display: "flex",
                flexDirection: "row",
                padding: 5,
                marginLeft: 50,
            }}
        >
            <h5
                style={{
                    fontWeight: "bold",
                    margin: "0px 5px",
                    whiteSpace: "nowrap"
                }}
            >
                <span
                    title={props.mergedTicketID ? `Merged from ticket ${props.mergedTicketID}` : undefined}
                    className={`fa ${props.mergedTicketID ? "fa-code-merge" : "fa-wrench"}`}
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
                        textDecoration: "none",
                        fontWeight: "bold"
                    }}
                >
                    {props.name}:
                </a>
            </h5>
            <div
                style={{
                    margin: 0,
                    color: isDarkMode ? "#999" : "#888",
                    paddingTop: 2
                }}
            >
                <FeedRenderer body={props.body}/>
            </div>
        </div>
    )
}