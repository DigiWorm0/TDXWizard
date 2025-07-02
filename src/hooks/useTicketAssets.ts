import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import getTicketIDFromURL from "../tdx-api/utils/getTicketIDFromURL";
import getAppIDFromURL from "../tdx-api/utils/getAppIDFromURL";

export const ticketAssetsAtom = atom(async () => {
    // API Client
    const client = new LocalTDXClient();

    // Get the ticket ID
    const ticketID = getTicketIDFromURL();
    if (!ticketID)
        return null;

    // Get the app ID
    const appID = getAppIDFromURL();
    if (!appID)
        return null;

    // Get the ticket betterfeed
    return await client.tickets.getTicketAssets(appID, ticketID);
});

export const syncTicketAssetsAtom = unwrap(ticketAssetsAtom, t => t);

export default function useTicketAssets() {
    return useAtomValue(syncTicketAssetsAtom);
}