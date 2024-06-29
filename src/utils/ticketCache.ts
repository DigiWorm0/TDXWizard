import TicketInfo from "../types/TicketInfo";
import { GM_setValue, GM_getValue } from "$";

export function saveTicketToCache(ticketInfo: TicketInfo) {
    GM_setValue(`ticketcache_${ticketInfo.id}`, JSON.stringify(ticketInfo));
}

export function getTicketFromCache() {
    // Get the TicketID from the URL
    const url = new URL(window.location.href);
    const id = url.searchParams.get("TicketID");
    if (!id)
        throw new Error("TicketID not found in URL");

    // Retrieve the ticket from the cache
    const ticketJSON = GM_getValue(`ticketcache_${id}`) as string;
    if (!ticketJSON)
        throw new Error("Ticket not found in cache");

    // Parse the JSON and return the ticket
    return JSON.parse(ticketJSON) as TicketInfo;
}