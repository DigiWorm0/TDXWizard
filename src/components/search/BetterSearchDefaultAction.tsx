import React from "react";
import AppID from "../../types/AppID";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import BetterSearchResult from "./BetterSearchResult";

export interface BetterSearchDefaultActionProps {
    searchQuery: string;
    active?: boolean;
}

const REGEX_LIST: Record<SearchType, RegExp[]> = {
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
    ],

    // Default case for any other search
    "Default": []
}

enum SearchType {
    Person = "Person",
    EStout = "EStout",
    Printer = "Printer",
    Laptop = "Laptop",
    Ticket = "Ticket",
    Default = "Default"
}

const SEARCH_TYPE_ICONS: Record<SearchType, string> = {
    Person: "fa-user",
    EStout: "fa-laptop",
    Printer: "fa-print",
    Laptop: "fa-laptop",
    Ticket: "fa-ticket",
    Default: "fa-search"
}

export default function BetterSearchDefaultAction(props: BetterSearchDefaultActionProps) {
    const {searchQuery} = props;

    const [text, setText] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchURL, setSearchURL] = React.useState("");
    const [searchType, setSearchType] = React.useState<SearchType>(SearchType.Default);

    const targetSearchType = React.useMemo(() => {
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

    const trySearchAsset = async (appID: AppID, searchType: SearchType) => {
        // API Client
        const client = new UWStoutTDXClient();

        // Search for the asset
        const assets = await client.assets.searchAssets(appID, {SerialLike: searchQuery, MaxResults: 1});

        // Apply to the search URL
        if (assets.length > 0) {
            setText(assets[0].Tag ?? assets[0].Name ?? searchQuery);
            setSearchURL(`/TDNext/Apps/${appID}/Assets/AssetDet?AssetID=${assets[0].ID}`);
            setSearchType(searchType);
        }
    }

    const trySearchUser = async (searchType: SearchType) => {
        // API Client
        const client = new UWStoutTDXClient();

        // Search for the user
        const users = await client.people.search({
            SearchText: searchQuery,
            MaxResults: 1
        });

        // Apply to the search URL
        if (users.length > 0) {
            setText(users[0].FullName ?? searchQuery);
            setSearchURL(`/TDNext/Apps/People/PersonDet?U=${users[0].UID}`);
            setSearchType(searchType);
        }
    }

    const updateSearchURL = async () => {

        // Default
        setText(`Search "${searchQuery}"`);
        setSearchURL(`/TDNext/Apps/Shared/Global/Search?searchText=${encodeURIComponent(searchQuery)}`);
        setSearchType(SearchType.Default);

        // Ticket
        if (targetSearchType === SearchType.Ticket) {
            const ticketID = parseInt(searchQuery, 10);

            setText(`Ticket "${ticketID}"`);
            setSearchURL(`/TDNext/Apps/${AppID.Tickets}/Tickets/TicketDet.aspx?TicketID=${ticketID}`);
            setSearchType(SearchType.Ticket);
        }

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

    const color = React.useMemo(() => {
        if (searchType === SearchType.EStout ||
            searchType === SearchType.Laptop ||
            searchType === SearchType.Printer)
            return "#007bff"; // blue for Asset

        if (searchType === SearchType.Ticket)
            return "#fd7e14"; // orange for Ticket

        if (searchType === SearchType.Person)
            return "#28a745"; // green for Person

        return "#6c757d"; // grey for Default
    }, [searchType]);

    return (
        <BetterSearchResult
            href={searchURL}
            disabled={!searchQuery || isLoading}
            selected={props.active}
            icon={isLoading ?
                `fa fa-spinner fa-spin` :
                SEARCH_TYPE_ICONS[searchType]}
            color={color}
            text={text}
        />
    )
}