import React from "react";
import WindowLink from "../WindowLink";
import getAppIDFromURL from "../../../utils/tdx/getAppIDFromURL";

export interface AssetLinkProps {
    id: string;
    children: React.ReactNode;
}

export default function AssetLink(props: AssetLinkProps) {
    const appID = getAppIDFromURL();
    return (
        <WindowLink
            href={`${window.location.origin}/TDNext/Apps/${appID}/Assets/AssetDet?AssetID=${props.id}`}
        >
            {props.children}
        </WindowLink>
    )
}