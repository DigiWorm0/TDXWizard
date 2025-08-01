import React from "react";
import WindowLink from "../WindowLink";

export interface CILinkProps {
    id: number;
    children: React.ReactNode;
}

export default function CILink(props: CILinkProps) {
    return (
        <WindowLink
            href={`/TDNext/Apps/Shared/CIDet.aspx?ID=${props.id}`}
            title={`View Asset/CI ${props.id}`}
        >
            {props.children}
        </WindowLink>
    )
}