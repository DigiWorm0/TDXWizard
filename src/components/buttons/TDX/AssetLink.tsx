import React from "react";
import WindowLink from "../WindowLink";

export interface AssetLinkProps {
    id: string;
    children: React.ReactNode;
}

export default function AssetLink(props: AssetLinkProps) {
    return (
        <WindowLink
            href={`${window.location.origin}/TDNext/Apps/44/Assets/AssetDet?AssetID=${props.id}`}
        >
            {props.children}
        </WindowLink>
    )
}