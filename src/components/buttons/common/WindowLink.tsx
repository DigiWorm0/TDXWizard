import React from "react";
import openWindow from "../../../utils/openWindow";

export interface WindowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
}

export default function WindowLink(props: WindowLinkProps) {
    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        openWindow(props.href ?? "#", props.title);
    }

    return (
        <a
            {...props}
            onClick={onClick}
        >
            {props.children}
        </a>
    );
}
