import {useAtomValue} from "jotai";
import {GM_getValue, GM_setValue} from "$";
import TicketStatus from "../tdx-api/types/TicketStatus";
import getAppIDFromURL from "../tdx-api/utils/getAppIDFromURL";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import {unwrap} from "jotai/utils";
import atomWithCache from "../utils/atomWithCache";

type TicketStatusCache = Record<number, TicketStatus[]>;

export const ticketStatusesAtom = atomWithCache("ticketStatuses", async () => {

        // Get the app ID from the URL
        const appID = getAppIDFromURL();
        if (!appID)
            return null;

        // Pull the ticket status from the cache
        const cache = JSON.parse(GM_getValue("ticketStatusCache") ?? "{}") as TicketStatusCache;
        if (appID in cache)
            return cache[appID];

        // Fetch the ticket status from the API
        const client = new LocalTDXClient();
        const ticketStatuses = await client.tickets.getTicketStatuses(appID);
        if (!ticketStatuses)
            return [];

        // Update the cache
        const newCache = {...cache, [appID]: ticketStatuses};
        GM_setValue("ticketStatusCache", JSON.stringify(newCache));
        return ticketStatuses;
    }
);

export const syncTicketStatusesAtom = unwrap(ticketStatusesAtom, t => t);

export default function useTicketStatuses() {
    return useAtomValue(syncTicketStatusesAtom);
}