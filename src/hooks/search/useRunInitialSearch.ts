import useSettings from "../useSettings";
import useTicketAppIDs from "../useTicketAppIDs";
import React from "react";
import SearchResult from "../../types/SearchResult";
import {SearchType} from "../../types/SearchType";
import AppID from "../../types/AppID";
import LocalTDXClient from "../../tdx-api/LocalTDXClient";
import getSettings from "../../utils/getSettings";
import useAssetAppIDs from "../useAssetAppIDs";
import AutoDetectSearchType from "../../types/SearchCategory";
import UWStoutAppID from "../../types/UWStoutAppID";
import checkIsUWStout from "../../utils/checkIsUWStout";
import HTTPResponseError from "../../utils/HTTPResponseError";

type InitialSearchResultLoader = Promise<SearchResult | null>;

const IGNORED_RESPONSE_CODES = [
    404,    // Not Found
    403     // Forbidden (If the app ID is restricted)
];

export default function useRunInitialSearch() {
    const [settings] = useSettings();
    const ticketApps = useTicketAppIDs();
    const assetApps = useAssetAppIDs();
    const {enableNewSearchAutoDetectQuery} = settings;

    // Default search
    return React.useCallback(async (searchQuery: string, defaultResult: SearchResult): Promise<SearchResult> => {

        // Abort if auto-detect is disabled
        if (!enableNewSearchAutoDetectQuery)
            return defaultResult;

        // Get the target search type
        const targetSearchTypes = getTargetSearchTypes(searchQuery);

        // Iterate through the target search types
        for (const type of targetSearchTypes) {

            // If the type is not defined, skip it
            if (!type || !type.type)
                continue;

            // Search for Assets
            if (type.type === SearchType.Asset) {
                const appIDs = type.appID ? [type.appID] : assetApps;
                const res = await trySearchAsset(appIDs, SearchType.Asset, searchQuery);
                if (res) return res;
            }

            // Search for Tickets
            else if (type.type === SearchType.Ticket) {
                const appIDs = type.appID ? [type.appID] : ticketApps;
                const res = await trySearchTicket(appIDs, SearchType.Ticket, searchQuery);
                if (res) return res;
            }

            // Search for People
            else if (type.type === SearchType.Person) {
                const res = await trySearchUser(SearchType.Person, searchQuery);
                if (res) return res;
            }

            // Unknown search type
            console.warn(`Unknown search type: ${type.type}`);
        }

        // Default Search
        return defaultResult;
    }, [enableNewSearchAutoDetectQuery, ticketApps, assetApps]);
}

const UWSTOUT_TYPES: AutoDetectSearchType[] = [
    {
        type: SearchType.Person,
        regexes: ["^0\\d{6}$", "^[a-zA-Z]+\\d{4}$"]
    },
    {
        // Faculty/Staff Assets
        type: SearchType.Asset,
        appID: UWStoutAppID.Inventory,
        regexes: ["^[Cc]-?\\d{4,5}$"]
    },
    {
        // Student Assets
        type: SearchType.Asset,
        appID: UWStoutAppID.EStoutInventory,
        regexes: ["^20\\d{7}$"]
    },
    {
        // Printer Assets
        type: SearchType.Asset,
        appID: UWStoutAppID.PrinterInventory,
        regexes: ["^[Ll][Pp]-?\\d{4}$"]
    },
];

function getTargetSearchTypes(searchQuery: string): AutoDetectSearchType[] {
    if (!searchQuery)
        return [];

    // Get the search types from settings
    const {autoDetectSearchTypes} = getSettings();
    let allSearchTypes = autoDetectSearchTypes || [];
    if (checkIsUWStout())
        allSearchTypes = [...allSearchTypes, ...UWSTOUT_TYPES];

    // Trim the query
    const trimmedQuery = searchQuery.trim();

    // Loop through Search Types
    const targetSearchTypes: AutoDetectSearchType[] = [];
    for (const type of allSearchTypes) {

        // Find matching regexes
        const regexes = type.regexes?.map(regex => new RegExp(regex)) || [];
        if (regexes.some(regex => regex.test(trimmedQuery)))
            targetSearchTypes.push(type);
    }

    // Return the target search types
    return targetSearchTypes;
}

async function trySearchTicket(appIDs: AppID[], type: SearchType, searchQuery: string): InitialSearchResultLoader {
    // API Client
    const client = new LocalTDXClient();

    // Get the ticket ID from the search query
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

            // Apply to the search URL
            return {
                text: `${ticketID} - ${ticket.Title}`,
                historyText: ticket.Title,
                type,
                href: `/TDNext/Apps/${ticket.AppID}/Tickets/TicketDet.aspx?TicketID=${ticketID}`
            };
        } catch (error) {
            if (error instanceof HTTPResponseError) {
                // If the user is not found, return null
                if (IGNORED_RESPONSE_CODES.includes(error.response.status))
                    return null;
            }

            // Re-throw other errors
            throw error;
        }
    }

    return null;
}

async function trySearchAsset(appIDs: AppID[], type: SearchType, searchQuery: string): InitialSearchResultLoader {
    // API Client
    const client = new LocalTDXClient();

    // Iterate through the app IDs
    for (const appID of appIDs) {

        try {
            // Search for the asset
            const assets = await client.assets.searchAssets(appID, {
                SerialLike: searchQuery.trim(),
                MaxResults: 2
            });

            // Only allow if exactly one asset is found
            if (assets.length !== 1)
                continue;

            // Apply to the search URL
            return {
                text: assets[0].Tag ?? assets[0].Name ?? searchQuery,
                type,
                href: `/TDNext/Apps/${appID}/Assets/AssetDet?AssetID=${assets[0].ID}`
            }
        } catch (error) {
            if (error instanceof HTTPResponseError) {
                // If the user is not found, return null
                if (IGNORED_RESPONSE_CODES.includes(error.response.status))
                    return null;
            }

            // Re-throw other errors
            throw error;
        }
    }

    // No asset found
    return null;
}

async function trySearchUser(type: SearchType, searchQuery: string): InitialSearchResultLoader {
    // API Client
    const client = new LocalTDXClient();

    // Search for the user
    try {
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
    } catch (error) {
        if (error instanceof HTTPResponseError) {
            // If the user is not found, return null
            if (IGNORED_RESPONSE_CODES.includes(error.response.status))
                return null;
        }

        // Re-throw other errors
        throw error;
    }
}