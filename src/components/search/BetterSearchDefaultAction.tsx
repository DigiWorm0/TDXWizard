import React from "react";
import {Dropdown} from "react-bootstrap";
import openWindow from "../../utils/openWindow";
import AppID from "../../types/AppID";

export interface BetterSearchDefaultActionProps {
    searchQuery: string;
}

const REGEX_LIST: Record<SearchType, RegExp[]> = {
    // "Asset": [
    //     /^\b[Cc]-?\d{4,5}\b$/, // C-Number
    //     /^\b20\d{7}\b$/ // Asset Tag
    // ],
    "Ticket": [
        /^\b\d{5,7}\b$/ // Ticket Number
    ],

    // Default case for any other search
    "Default": []
}

enum SearchType {
    // Asset = "Asset",
    Ticket = "Ticket",
    Default = "Default"
}

const SEARCH_TYPE_ICONS: Record<SearchType, string> = {
    // Asset: "fa-laptop",
    Ticket: "fa-ticket",
    Default: "fa-search"
}

export default function BetterSearchDefaultAction(props: BetterSearchDefaultActionProps) {
    const {searchQuery} = props;

    const searchType = React.useMemo(() => {
        if (!searchQuery)
            return SearchType.Default;

        // Loop through Search Types
        const searchTypes = Object.keys(REGEX_LIST) as SearchType[];
        for (const type of searchTypes) {

            // Find matching regexes
            const regexes = REGEX_LIST[type];
            if (regexes.some(regex => regex.test(searchQuery)))
                return type;
        }

        // If no match found, return Default
        return SearchType.Default;
    }, [searchQuery]);

    const searchURL = React.useMemo(() => {
        // Redirect based on search type
        if (searchType === SearchType.Ticket) {
            const ticketID = parseInt(searchQuery, 10); // <<< b10 radix to ensure it's a number
            return `/TDNext/Apps/${AppID.Tickets}/Tickets/TicketDet.aspx?TicketID=${ticketID}`;
        } else {
            // Default search
            return `/TDNext/Apps/Shared/Global/Search?searchText=${encodeURIComponent(searchQuery)}`;
        }
    }, [searchQuery, searchType]);

    const onClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Prevent default link behavior
        e.preventDefault();
        e.stopPropagation();

        // Check if the search query is empty
        if (!searchQuery)
            return;

        // Open window to the search URL
        openWindow(searchURL, "Search");
    }

    return (
        <>
            <Dropdown.Item
                className={"dropdown-default"}
                autoFocus
                href={searchURL}
                onClick={onClick}
                style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14,
                }}
            >
                <span
                    className={`fa ${SEARCH_TYPE_ICONS[searchType]} me-1`}
                    style={{
                        width: 20,
                        textAlign: "center"
                    }}
                />

                {searchType === SearchType.Ticket && `Ticket "${searchQuery}"`}
                {searchType === SearchType.Default && `Search "${searchQuery}"`}
            </Dropdown.Item>

            <Dropdown.Divider/>
        </>
    )
}