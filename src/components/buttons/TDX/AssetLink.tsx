import React from "react";
import WindowLink from "../common/WindowLink";

export interface AssetLinkProps {
    id: number;
    children: React.ReactNode;
    appID?: number;
}

export default function AssetLink(props: AssetLinkProps) {
    return (
        <WindowLink
            href={`${window.location.origin}/TDNext/Apps/${props.appID}/Assets/AssetDet?AssetID=${props.id}`}
            title={`View Asset ${props.id}`}
        >
            {props.children}
        </WindowLink>
    )
}