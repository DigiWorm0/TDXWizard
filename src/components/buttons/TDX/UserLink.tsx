import React from "react";
import WindowLink from "../WindowLink";
import Guid from "../../../tdx-api/types/Guid";

export interface AssetLinkProps {
    id: Guid;
    children: React.ReactNode;
}

export default function UserLink(props: AssetLinkProps) {
    return (
        <WindowLink
            href={`${window.location.origin}/TDNext/Apps/People/PersonDet.aspx?U=${props.id}`}
            title={`View User ${props.id}`}
        >
            {props.children}
        </WindowLink>
    )
}