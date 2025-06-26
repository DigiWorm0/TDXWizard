import {SearchType} from "../types/SearchType";
import AppID from "../types/AppID";
import UWStoutTDXClient from "./tdx/UWStoutTDXClient";
import SearchResult from "../types/SearchResult";

type InitialSearchResultLoader = Promise<SearchResult | null>;

export default async function runInitialSearch(searchQuery: string, autoDetect?: boolean): Promise<SearchResult> {

    // Default search
    const DEFAULT_RESULT: SearchResult = {
        text: `Search "${searchQuery}"`,
        historyText: searchQuery,
        type: SearchType.Search,
        href: `/TDNext/Apps/Shared/Global/Search?searchText=${encodeURIComponent(searchQuery)}`
    };
    if (!autoDetect)
        return DEFAULT_RESULT;

    try {
        // Get the target search type
        const targetSearchType = getTargetSearchType(searchQuery);

        // Ticket
        if (targetSearchType === SearchType.Ticket)
            return await trySearchTicket(AppID.Tickets, SearchType.Ticket, searchQuery) || DEFAULT_RESULT;

        // User
        if (targetSearchType === SearchType.Person)
            return await trySearchUser(SearchType.Person, searchQuery) || DEFAULT_RESULT;

        // Asset
        if (targetSearchType === SearchType.Laptop)
            return await trySearchAsset(AppID.Inventory, SearchType.Laptop, searchQuery) || DEFAULT_RESULT;
        if (targetSearchType === SearchType.EStout)
            return await trySearchAsset(AppID.EStoutInventory, SearchType.EStout, searchQuery) || DEFAULT_RESULT;
        if (targetSearchType === SearchType.Printer)
            return await trySearchAsset(AppID.PrinterInventory, SearchType.Printer, searchQuery) || DEFAULT_RESULT;
    } catch (error) {
        // Log the error
        console.error("Error during initial search:", error);
    }

    // Default Search
    return DEFAULT_RESULT;
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

function getTargetSearchType(searchQuery: string): SearchType {
    if (!searchQuery)
        return SearchType.Search;

    // Trim the query
    const trimmedQuery = searchQuery.trim();


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
}

async function trySearchTicket(appID: AppID, type: SearchType, searchQuery: string): InitialSearchResultLoader {
    // API Client
    const client = new UWStoutTDXClient();

    // Search for the ticket
    const ticketID = parseInt(searchQuery.trim(), 10);
    if (isNaN(ticketID))
        return null;

    const ticket = await client.tickets.getTicket(appID, ticketID);
    if (!ticket)
        return null;

    // Apply to the search URL
    return {
        text: `${ticketID} - ${ticket.Title}`,
        historyText: ticket.Title,
        type,
        href: `/TDNext/Apps/${appID}/Tickets/TicketDet.aspx?TicketID=${ticketID}`
    }
}

async function trySearchAsset(appID: AppID, type: SearchType, searchQuery: string): InitialSearchResultLoader {
    // API Client
    const client = new UWStoutTDXClient();

    // Search for the asset
    const assets = await client.assets.searchAssets(appID, {
        SerialLike: searchQuery.trim(),
        MaxResults: 3
    });
    if (assets.length !== 1)
        return null;

    // Apply to the search URL
    return {
        text: assets[0].Tag ?? assets[0].Name ?? searchQuery,
        type,
        href: `/TDNext/Apps/${appID}/Assets/AssetDet?AssetID=${assets[0].ID}`
    }
}

async function trySearchUser(type: SearchType, searchQuery: string): InitialSearchResultLoader {
    // API Client
    const client = new UWStoutTDXClient();

    // Search for the user
    const users = await client.people.search({
        SearchText: searchQuery.trim(),
        MaxResults: 1
    });
    if (users.length === 0)
        return null;

    // Apply to the search URL
    return {
        text: users[0].FullName ?? searchQuery,
        type,
        href: `/TDNext/Apps/People/PersonDet?U=${users[0].UID}`
    }
}