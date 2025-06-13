import React from "react";
import WindowLink from "../WindowLink";

export interface AssetLinkProps {
    id: number;
    children: React.ReactNode;
}

export default function DepartmentLink(props: AssetLinkProps) {
    return (
        <WindowLink
            href={`${window.location.origin}/TDNext/Apps/Shared/AccountDetail.aspx?CACID=${props.id}`}
            title={`View Department ${props.id}`}
        >
            {props.children}
        </WindowLink>
    )
}