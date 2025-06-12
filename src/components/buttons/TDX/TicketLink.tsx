import React from "react";
import WindowLink from "../WindowLink";

export interface TicketLinkProps {
    id: number;
    children: React.ReactNode;
    appID?: number;
}

export default function TicketLink(props: TicketLinkProps) {
    return (
        <WindowLink
            href={`${window.location.origin}/TDNext/Apps/${props.appID}/Tickets/TicketDet?TicketID=${props.id}`}
        >
            {props.children}
        </WindowLink>
    )
}