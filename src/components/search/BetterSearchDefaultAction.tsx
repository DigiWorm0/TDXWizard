import React from "react";
import AppID from "../../types/AppID";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import BetterSearchResult from "./BetterSearchResult";
import useSettings from "../../hooks/useSettings";
import BetterSearchDropdownItem from "./BetterSearchDropdownItem";
import {SearchType} from "../../types/SearchType";

export interface BetterSearchDefaultActionProps {
    searchQuery: string;
    active?: boolean;
}

const REGEX_LIST: Partial<Record<SearchType, RegExp[]>> = {
    "Person": [
        /^0\d{6}$/, // Student ID (0 - 7 digits)
        /^[a-zA-Z]+\d{4}$/, // Username
        /^.+@uwstout\.edu$/, // Email
        /^.+@my\.uwstout\.edu$/, // Student Email
    ],
    "EStout": [
        /^20\d{7}$/, // Asset Tag
    ],
    "Printer": [
        /^[Ll][Pp]-?\d{4}$/, // LP-Number (Printer)
    ],
    "Laptop": [
        /^[Cc]-?\d{4,5}$/, // C-Number (Computer)
    ],
    "Ticket": [
        /^\d{5,7}$/ // Ticket Number
    ]
};

export default function BetterSearchDefaultAction(props: BetterSearchDefaultActionProps) {
    const {searchQuery} = props;
    const trimmedQuery = searchQuery.trim();
    const [settings] = useSettings();

    const [text, setText] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchURL, setSearchURL] = React.useState("");
    const [searchType, setSearchType] = React.useState<SearchType>(SearchType.Search);

    const targetSearchType = React.useMemo(() => {
        if (!searchQuery)
            return SearchType.Search;


        // Loop through Search Types
        const searchTypes = Object.keys(REGEX_LIST) as SearchType[];
        for (const type of searchTypes) {

            // Find matching regexes
            const regexes = REGEX_LIST[type];
            if (regexes?.some(regex => regex.test(trimmedQuery)))
                return type;
        }

        // If no match found, return Default
        return SearchType.Search;
    }, [searchQuery]);

    const trySearchTicket = async (appID: AppID, searchType: SearchType) => {
        // API Client
        const client = new UWStoutTDXClient();

        // Search for the ticket
        const ticketID = parseInt(trimmedQuery, 10);
        if (isNaN(ticketID))
            return;

        const ticket = await client.tickets.getTicket(appID, ticketID);

        // Apply to the search URL
        if (ticket) {
            setText(ticket.Title);
            setSearchURL(`/TDNext/Apps/${appID}/Tickets/TicketDet.aspx?TicketID=${ticketID}`);
            setSearchType(searchType);
        }
    }

    const trySearchAsset = async (appID: AppID, searchType: SearchType) => {
        // API Client
        const client = new UWStoutTDXClient();

        // Search for the asset
        const assets = await client.assets.searchAssets(appID, {SerialLike: trimmedQuery, MaxResults: 1});

        // Apply to the search URL
        if (assets.length > 0) {
            setText(assets[0].Tag ?? assets[0].Name ?? trimmedQuery);
            setSearchURL(`/TDNext/Apps/${appID}/Assets/AssetDet?AssetID=${assets[0].ID}`);
            setSearchType(searchType);
        }
    }

    const trySearchUser = async (searchType: SearchType) => {
        // API Client
        const client = new UWStoutTDXClient();

        // Search for the user
        const users = await client.people.search({
            SearchText: trimmedQuery,
            MaxResults: 1
        });

        // Apply to the search URL
        if (users.length > 0) {
            setText(users[0].FullName ?? trimmedQuery);
            setSearchURL(`/TDNext/Apps/People/PersonDet?U=${users[0].UID}`);
            setSearchType(searchType);
        }
    }

    const updateSearchURL = async () => {

        // Default
        setText(`Search "${searchQuery}"`);
        setSearchURL(`/TDNext/Apps/Shared/Global/Search?searchText=${encodeURIComponent(searchQuery)}`);
        setSearchType(SearchType.Search);

        // Abort if disabled
        if (!settings.enableNewSearchAutoDetectQuery)
            return;

        // Ticket
        if (targetSearchType === SearchType.Ticket)
            await trySearchTicket(AppID.Tickets, SearchType.Ticket);

        // User
        if (targetSearchType === SearchType.Person)
            await trySearchUser(SearchType.Person);

        // Asset
        if (targetSearchType === SearchType.Laptop)
            await trySearchAsset(AppID.Inventory, SearchType.Laptop);
        if (targetSearchType === SearchType.EStout)
            await trySearchAsset(AppID.EStoutInventory, SearchType.EStout);
        if (targetSearchType === SearchType.Printer)
            await trySearchAsset(AppID.PrinterInventory, SearchType.Printer);
    }

    React.useEffect(() => {
        setIsLoading(true);
        updateSearchURL()
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [searchQuery, targetSearchType]);

    if (isLoading)
        return (
            <BetterSearchDropdownItem
                text={"Searching..."}
                icon={`fa fa-spinner fa-spin`}
                disabled
            />
        );

    return (
        <BetterSearchResult
            href={searchURL}
            disabled={!searchQuery || isLoading}
            selected={props.active}
            type={searchType}
            text={text}

            // Use searchQuery as history text for generic search
            historyText={searchType === SearchType.Search ? searchQuery : undefined}
        />
    )
}