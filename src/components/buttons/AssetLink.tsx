import React from "react";

export interface AssetLinkProps {
    id: string;
    children: React.ReactNode;
}

export default function AssetLink(props: AssetLinkProps) {
    const url = `${window.location.origin}/TDNext/Apps/44/Assets/AssetDet?AssetID=${props.id}`;

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        window.open(
            url,
            props.id,
            "width=800,height=600"
        );
    }

    return (
        <a
            href={url}
            onClick={onClick}
        >
            {props.children}
        </a>
    );
}