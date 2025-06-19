import React from "react";

export interface BetterSearchDropdownItemProps {
    text?: string;
    href?: string;
    icon?: string;
    color?: string;

    disabled?: boolean;
    selected?: boolean;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function BetterSearchDropdownItem(props: BetterSearchDropdownItemProps) {
    const ref = React.useRef<HTMLAnchorElement>(null);

    React.useEffect(() => {
        // If off-screen, scroll into view
        if (props.selected)
            ref.current?.scrollIntoView({behavior: "smooth", block: "nearest"});
    }, [props.selected]);

    return (
        <a
            ref={ref}
            className={`dropdown-item ${props.disabled ? "disabled" : ""} ${props.selected ? "active" : ""}`}
            href={props.href ?? "#"}
            onClick={props.onClick}
            onMouseDown={(e) => e.preventDefault()} // Prevent focus change on mousedown
            style={{
                paddingTop: 0,
                paddingBottom: 0,
                fontSize: 14,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            }}
        >
            <span
                className={`${props.icon || "fa-question-mark"} me-1`}
                style={{
                    width: 20,
                    textAlign: "center",
                    color: props.color || "#6c757d", // Default to grey if no color is provided
                }}
            />
            {props.text}
        </a>
    )
}