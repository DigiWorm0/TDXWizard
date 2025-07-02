import React from "react";
import openWindow from "../../utils/openWindow";
import useAppendSearchHistory from "../../hooks/useAppendSearchHistory";
import BetterSearchDropdownItem from "./BetterSearchDropdownItem";
import {SearchType} from "../../types/SearchType";
import SearchResult from "../../types/SearchResult";

export interface BetterSearchResultProps {
    result: SearchResult;

    onHide: () => void;
    disabled?: boolean;
    selected?: boolean;
    disableHistory?: boolean; // Optional flag to disable history saving
}


const SEARCH_TYPE_TO_ICON: Record<SearchType, string> = {
    Person: "fa-user",
    EStout: "fa-laptop",
    Printer: "fa-print",
    Laptop: "fa-laptop",
    Ticket: "fa-ticket",
    Search: "fa-bettersearch",
    Other: "fa-question"
}

export default function BetterSearchResult(props: BetterSearchResultProps) {
    const appendSearchHistory = useAppendSearchHistory();
    const {result} = props;

    const color = React.useMemo(() => {
        if (result.type === SearchType.Laptop ||
            result.type === SearchType.Printer ||
            result.type === SearchType.EStout)
            return "#007bff"; // blue for Asset
        if (result.type === SearchType.Ticket)
            return "#fd7e14"; // orange for Ticket
        if (result.type === SearchType.Person)
            return "#28a745"; // green for Person

        return "#6c757d"; // grey for other types
    }, [result.type]);

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {

        // Stop the default action and propagation
        e.preventDefault();
        e.stopPropagation();

        // Abort if the link is disabled
        if (props.disabled)
            return;

        // Open the link in a new window
        openWindow(result.href, "Search Result");

        // Hide the bettersearch dropdown
        props.onHide();

        // Save to bettersearch history
        if (!props.disableHistory)
            appendSearchHistory({
                ...result,
                text: result.historyText ?? result.text, // Use historyText if provided, otherwise use text
            });
    }

    return (
        <BetterSearchDropdownItem
            text={result.text}
            href={result.href}
            icon={`fa ${SEARCH_TYPE_TO_ICON[result.type ?? SearchType.Other]}`}
            color={color}
            disabled={props.disabled}
            selected={props.selected}
            onClick={onClick}
        />
    )
}