import React from "react";

export interface WindowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
            {...props}
            onClick={onClick}
        >
            {props.children}
        </a>
    );
}
