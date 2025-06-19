import {Dropdown} from "react-bootstrap";
import React from "react";
import openWindow from "../../utils/openWindow";

export interface BetterSearchResultProps {
    href: string;
    disabled?: boolean;
    icon?: string;
    color?: string;
    text: string;
    selected?: boolean;
}

export default function BetterSearchResult(props: BetterSearchResultProps) {
    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {

        // Stop the default action and propagation
        e.preventDefault();
        e.stopPropagation();

        // Abort if the link is disabled
        if (props.disabled)
            return;

        // Open the link in a new window
        openWindow(props.href, "Search Result");
    }

    return (
        <Dropdown.Item
            href={props.href}
            onClick={onClick}
            onMouseDown={(e) => e.preventDefault()} // Prevent focus change on mousedown
            disabled={props.disabled}
            active={props.selected}
            style={{
                paddingTop: 0,
                paddingBottom: 0,
                fontSize: 14,
            }}
        >
            <span
                className={`fa ${props.icon ?? "fa-question"} me-1`}
                style={{
                    width: 20,
                    textAlign: "center",
                    color: props.color,
                }}
            />
            {props.text}
        </Dropdown.Item>
    )
}