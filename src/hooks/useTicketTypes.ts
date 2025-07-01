import {useAtomValue} from "jotai";
import {GM_getValue, GM_setValue} from "$";
import getAppIDFromURL from "../utils/tdx/getAppIDFromURL";
import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import {unwrap} from "jotai/utils";
import atomWithCache from "../utils/atomWithCache";
import TicketType from "../tdx-api/types/TicketType";

type TicketTypeCache = Record<number, TicketType[]>;

export const ticketTypesAtom = atomWithCache("ticketTypes", async () => {

        // Get the app ID from the URL
        const appID = getAppIDFromURL();
        if (!appID)
            return null;

        // Pull the ticket type from the cache
        const cache = JSON.parse(GM_getValue("ticketTypeCache") ?? "{}") as TicketTypeCache;
        if (appID in cache)
            return cache[appID];

        // Fetch the ticket type from the API
        const client = new UWStoutTDXClient();
        const ticketTypes = await client.ticketTypes.getTicketTypes(appID);
        if (!ticketTypes)
            return [];

        // Update the cache
        const newCache = {...cache, [appID]: ticketTypes};
        GM_setValue("ticketTypeCache", JSON.stringify(newCache));
        return ticketTypes;
    }
);

export const syncTicketTypesAtom = unwrap(ticketTypesAtom, t => t);

export default function useTicketTypes() {
    return useAtomValue(syncTicketTypesAtom);
}