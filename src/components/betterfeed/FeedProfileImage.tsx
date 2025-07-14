import React from "react";
import useUser from "../../hooks/useUser";
import openWindow from "../../utils/openWindow";
import useSettings from "../../hooks/useSettings";

export interface TicketFeedProfileImageProps {
    name: string;
    size: number;
    uid?: string;
    href?: string;
    color: string;
    dontOpenLink?: boolean;
}

export default function FeedProfileImage(props: TicketFeedProfileImageProps) {
    const [settings] = useSettings();
    const user = useUser(props.uid ?? "");
    const isUser = user?.SecurityRoleName === "Client";

    const openLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (props.href)
            openWindow(props.href ?? "#");
    }

    return (
        <div>
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
                    {settings.customProfileImages && user?.ProfileImageFileName ? (
                        <img
                            src={`/TDPortal/Images/Profile?fileName=${user.ProfileImageFileName}`}
                            alt={props.name}
                            width={props.size}
                            height={props.size}
                            style={{
                                minWidth: props.size,
                                minHeight: props.size,
                                borderRadius: props.size / 6,
                                objectFit: "fill"
                            }}
                        />
                    ) : (
                        <span>
                        {props.name[0]}
                    </span>
                    )}
                </div>
            </a>
        </div>
    )
}