import React from "react";

export interface WindowLinkProps {
    href: string;
    children: React.ReactNode;
}

export default function WindowLink(props: WindowLinkProps) {
    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        window.open(
            props.href,
            "_blank",
            "width=800,height=600"
        );
    }

    return (
        <a
            href={props.href}
            onClick={onClick}
        >
            {props.children}
        </a>
    );
}
