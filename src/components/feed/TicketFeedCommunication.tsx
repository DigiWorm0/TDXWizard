import DateTime from "../../tdx-api/types/DateTime";
import dateToString from "../../utils/datetime/dateToString";
import getDateAgo from "../../utils/datetime/getDateAgo";
import TicketFeedProfileImage from "./TicketFeedProfileImage";
import getColorFromName from "../../utils/getColorFromName";
import React from "react";

export interface TicketFeedCommunicationProps {
    uid: string,
    name: string,
    date: DateTime,
    isRequester: boolean,
    isPrivate: boolean,
    body: string,
    notifiedList: string
}

export default function TicketFeedCommunication(props: TicketFeedCommunicationProps) {
    const profileURL = `/TDNext/Apps/People/PersonDet.aspx?U=${props.uid}`;

    const openProfile = (e: React.MouseEvent<HTMLAnchorElement>) => {
        window.open(
            profileURL,
            "Profile",
            "width=992,height=700"
        );
        e.preventDefault();
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                padding: "10px",
            }}
        >
            <TicketFeedProfileImage
                uid={props.uid}
                name={props.name}
                href={profileURL}
                color={getColorFromName(props.name)}
            />
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
                        margin: 0
                    }}
                >
                    <a
                        href={profileURL}
                        onClick={openProfile}
                        style={{
                            textDecoration: "none",
                            color: getColorFromName(props.name)
                        }}
                    >
                        {props.name}
                    </a>
                    {props.isRequester && (
                        <span
                            title={"Requester"}
                            className={"fa fa-star"}
                            style={{
                                color: getColorFromName(props.name),
                                marginLeft: 4
                            }}
                        />
                    )}

                    {props.isPrivate && (
                        <span style={{color: "#888", marginLeft: 4, fontSize: 12}}>
                            (private)
                        </span>
                    )}
                    <span style={{color: "#aaa", fontWeight: "normal", marginLeft: 4, fontSize: 12}}>
                        {dateToString(props.date)}
                        {" · "}
                        {getDateAgo(props.date)}
                    </span>
                </h5>
                <p
                    style={{
                        margin: "5px 0px"
                    }}
                    dangerouslySetInnerHTML={{__html: props.body}}
                />
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
            </div>
        </div>
    );
}