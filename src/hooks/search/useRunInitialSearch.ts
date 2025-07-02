import useSettings from "../useSettings";
import useTicketAppIDs from "../useTicketAppIDs";
import React from "react";
import SearchResult from "../../types/SearchResult";
import {SearchType} from "../../types/SearchType";
import AppID from "../../types/AppID";
import LocalTDXClient from "../../tdx-api/LocalTDXClient";

type InitialSearchResultLoader = Promise<SearchResult | null>;

export default function useRunInitialSearch() {
    const [settings] = useSettings();
    const ticketApps = useTicketAppIDs();
    //const assetApps = useAssetAppIDs();
    const {enableNewSearchAutoDetectQuery} = settings;

    // Default bettersearch
    return React.useCallback(async (searchQuery: string): Promise<SearchResult> => {

        // Default result to fallback to
        const DEFAULT_RESULT: SearchResult = {
            text: `Search "${searchQuery}"`,
            historyText: searchQuery,
            type: SearchType.Search,
            href: `/TDNext/Apps/Shared/Global/Search?searchText=${encodeURIComponent(searchQuery)}`
        };

        // Abort if auto-detect is disabled
        if (!enableNewSearchAutoDetectQuery)
            return DEFAULT_RESULT;

        try {
            // Get the target bettersearch type
            const targetSearchTypes = getTargetSearchTypes(searchQuery);

            // Ticket
            if (targetSearchTypes.includes(SearchType.Ticket)) {
                const res = await trySearchTicket(ticketApps, SearchType.Ticket, searchQuery);
                if (res) return res;
            }

            // User
            if (targetSearchTypes.includes(SearchType.Person)) {
                const res = await trySearchUser(SearchType.Person, searchQuery);
                if (res) return res;
            }

            // Asset
            if (targetSearchTypes.includes(SearchType.Laptop)) {
                const res = await trySearchAsset(AppID.Inventory, SearchType.Laptop, searchQuery);
                if (res) return res;
            }
            if (targetSearchTypes.includes(SearchType.EStout)) {
                const res = await trySearchAsset(AppID.EStoutInventory, SearchType.EStout, searchQuery);
                if (res) return res;
            }
            if (targetSearchTypes.includes(SearchType.Printer)) {
                const res = await trySearchAsset(AppID.PrinterInventory, SearchType.Printer, searchQuery);
                if (res) return res;
            }
        } catch (error) {
            // Log the error
            console.error("Error during initial bettersearch:", error);
        }

        // Default Search
        return DEFAULT_RESULT;
    }, [enableNewSearchAutoDetectQuery, ticketApps]);
}

const REGEX_LIST: Partial<Record<SearchType, RegExp[]>> = {
    "Person": [
        /^0\d{6}$/, // Student ID (0 - 7 digits)
        /^[a-zA-Z]+\d{4}$/, // Username
        /^.+@/, // Email
    ],
    "Laptop": [
        /^[Cc]-?\d{4,5}$/, // C-Number (Computer)
        /^[A-Z0-9]{10,}$/, // Serial Number (10+ alphanumeric characters)
    ],
    "EStout": [
        /^20\d{7}$/, // Asset Tag
        /^[A-Z0-9]{10,}$/, // Serial Number (10+ alphanumeric characters)
    ],
    "Printer": [
        /^[Ll][Pp]-?\d{4}$/, // LP-Number (Printer)
        /^[A-Z0-9]{10,}$/, // Serial Number (10+ alphanumeric characters)
    ],
    "Ticket": [
        /^\d{5,8}$/ // Ticket Number
    ]
};

function getTargetSearchTypes(searchQuery: string): SearchType[] {
    if (!searchQuery)
        return [];

    // Trim the query
    const trimmedQuery = searchQuery.trim();


    // Loop through Search Types
    const allSearchTypes = Object.keys(REGEX_LIST) as SearchType[];
    const targetSearchTypes: SearchType[] = [];
    for (const type of allSearchTypes) {

        // Find matching regexes
        const regexes = REGEX_LIST[type];
        if (regexes?.some(regex => regex.test(trimmedQuery)))
            targetSearchTypes.push(type);
    }

    // Return the target bettersearch types
    return targetSearchTypes;
}

async function trySearchTicket(appIDs: AppID[], type: SearchType, searchQuery: string): InitialSearchResultLoader {
    // API Client
    const client = new LocalTDXClient();

    // Get the ticket ID from the bettersearch query
    const ticketID = parseInt(searchQuery.trim(), 10);
    if (isNaN(ticketID))
        return null;

    // Loop through the app IDs
    for (const appID of appIDs) {

        // Get the ticket
        try {
            const ticket = await client.tickets.getTicket(appID, ticketID);
            if (!ticket)
                continue;

            // Apply to the bettersearch URL
            return {
                text: `${ticketID} - ${ticket.Title}`,
                historyText: ticket.Title,
                type,
                href: `/TDNext/Apps/${ticket.AppID}/Tickets/TicketDet.aspx?TicketID=${ticketID}`
            };
        } catch (error) {
            // If the ticket is not found, continue to the next app ID
        }
    }

    return null;
}

async function trySearchAsset(appID: AppID, type: SearchType, searchQuery: string): InitialSearchResultLoader {
    // API Client
    const client = new LocalTDXClient();

    // Search for the asset
    const assets = await client.assets.searchAssets(appID, {
        SerialLike: searchQuery.trim(),
        MaxResults: 2
    });
    if (assets.length !== 1)
        return null;

    // Apply to the bettersearch URL
    return {
        text: assets[0].Tag ?? assets[0].Name ?? searchQuery,
        type,
        href: `/TDNext/Apps/${appID}/Assets/AssetDet?AssetID=${assets[0].ID}`
    }
}

async function trySearchUser(type: SearchType, searchQuery: string): InitialSearchResultLoader {
    // API Client
    const client = new LocalTDXClient();

    // Search for the user
    const users = await client.people.search({
        SearchText: searchQuery.trim(),
        MaxResults: 1
    });
    if (users.length === 0)
        return null;

    // Apply to the bettersearch URL
    return {
        text: users[0].FullName ?? searchQuery,
        type,
        href: `/TDNext/Apps/People/PersonDet?U=${users[0].UID}`
    }
}