import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import getTicketIDFromURL from "../tdx-api/utils/getTicketIDFromURL";
import getAppIDFromURL from "../tdx-api/utils/getAppIDFromURL";
import handleError from "../utils/handleError";
import {myUserHasApplication} from "./useMyUserHasApplication";

export const ticketAssetsAtom = atom(async (get) => {
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

    // Check if the user has access to TDAssets
    if (!get(myUserHasApplication("TDAssets")))
        return null;

    // Get the ticket feed
    return await client.tickets.getTicketAssets(appID, ticketID)
        .catch((e) => handleError("Error fetching ticket assets", e));
});

export const syncTicketAssetsAtom = unwrap(ticketAssetsAtom, t => t);

export default function useTicketAssets() {
    return useAtomValue(syncTicketAssetsAtom);
}