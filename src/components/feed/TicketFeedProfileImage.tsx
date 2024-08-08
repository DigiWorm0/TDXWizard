import React from "react";
import useUser from "../../hooks/useUser";

export interface TicketFeedProfileImageProps {
    name: string;
    size: number;
    uid?: string;
    href?: string;
    color: string;
}

export default function TicketFeedProfileImage(props: TicketFeedProfileImageProps) {
    const user = useUser(props.uid ?? "");
    const isUser = user?.SecurityRoleName === "Client";

    const openLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (!props.href)
            return;

        window.open(
            props.href,
            "Profile",
            "width=992,height=700"
        );
    }

    return (
        <a
            href={props.href}
            onClick={openLink}
            style={{textDecoration: "none"}}
        >
            <div
                style={{
                    width: props.size,
                    height: props.size,
                    borderRadius: props.size / 6,
                    backgroundColor: isUser ? "transparent" : props.color,
                    color: isUser ? props.color : "#fff",
                    border: `${props.size / 15}px solid ${props.color}`,
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: props.size / 2
                }}
            >
                <span>
                    {props.name[0]}
                </span>
            </div>
        </a>
    )
}