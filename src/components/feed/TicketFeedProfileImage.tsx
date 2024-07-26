import React from "react";
import useUser from "../../hooks/useUser";

export interface TicketFeedProfileImageProps {
    name: string;
    uid?: string;
    href?: string;
    color: string;
}

export default function TicketFeedProfileImage(props: TicketFeedProfileImageProps) {
    const user = useUser(props.uid ?? "");
    const isUser = user?.SecurityRoleName === "Client";

    const openLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
        window.open(
            props.href,
            "Profile",
            "width=992,height=700"
        );
        e.preventDefault();
    }

    return (
        <a
            href={props.href}
            onClick={openLink}
            style={{textDecoration: "none"}}
        >
            <div
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    backgroundColor: isUser ? "white" : props.color,
                    color: isUser ? props.color : "#fff",
                    border: `3px solid ${props.color}`,
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 30,
                    marginRight: 10
                }}
            >
                <span>
                    {props.name[0]}
                </span>
            </div>
        </a>
    )
}