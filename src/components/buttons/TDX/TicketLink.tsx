import React from "react";
import WindowLink from "../WindowLink";

export interface TicketLinkProps {
    id: number;
    children: React.ReactNode;
    appID?: number;
    anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export default function TicketLink(props: TicketLinkProps) {
    return (
        <WindowLink
            {...props.anchorProps}
            href={`${window.location.origin}/TDNext/Apps/${props.appID}/Tickets/TicketDet?TicketID=${props.id}`}
        >
            {props.children}
        </WindowLink>
    )
}