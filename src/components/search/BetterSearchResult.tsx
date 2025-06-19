import React from "react";
import openWindow from "../../utils/openWindow";
import useAppendSearchHistory from "../../hooks/useAppendSearchHistory";
import BetterSearchDropdownItem from "./BetterSearchDropdownItem";
import {SearchType} from "../../types/SearchType";

export interface BetterSearchResultProps {
    text: string;
    href: string;
    type?: SearchType;

    disabled?: boolean;
    selected?: boolean;


    historyText?: string; // Optional text for history, if different from display text
    disableHistory?: boolean; // Optional flag to disable history saving
}


const SEARCH_TYPE_TO_ICON: Record<SearchType, string> = {
    Person: "fa-user",
    EStout: "fa-laptop",
    Printer: "fa-print",
    Laptop: "fa-laptop",
    Ticket: "fa-ticket",
    Search: "fa-search",
    Other: "fa-question"
}

export default function BetterSearchResult(props: BetterSearchResultProps) {
    const appendSearchHistory = useAppendSearchHistory();

    const color = React.useMemo(() => {
        if (props.type === SearchType.Laptop ||
            props.type === SearchType.Printer ||
            props.type === SearchType.EStout)
            return "#007bff"; // blue for Asset
        if (props.type === SearchType.Ticket)
            return "#fd7e14"; // orange for Ticket
        if (props.type === SearchType.Person)
            return "#28a745"; // green for Person

        return "#6c757d"; // grey for other types
    }, [props.type]);

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {

        // Stop the default action and propagation
        e.preventDefault();
        e.stopPropagation();

        // Abort if the link is disabled
        if (props.disabled)
            return;

        // Open the link in a new window
        openWindow(props.href, "Search Result");

        // Save to search history
        if (!props.disableHistory)
            appendSearchHistory({
                ...props,
                text: props.historyText ?? props.text, // Use historyText if provided, otherwise use text
            });
    }

    return (
        <BetterSearchDropdownItem
            text={props.text}
            href={props.href}
            icon={`fa ${SEARCH_TYPE_TO_ICON[props.type ?? SearchType.Other]}`}
            color={color}
            disabled={props.disabled}
            selected={props.selected}
            onClick={onClick}
        />
    )
}