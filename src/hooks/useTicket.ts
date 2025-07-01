import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import getTicketIDFromURL from "../utils/tdx/getTicketIDFromURL";
import getAppIDFromURL from "../utils/tdx/getAppIDFromURL";

export const ticketAtom = atom(() => {
    const client = new UWStoutTDXClient();

    // Get the ticket ID
    const ticketID = getTicketIDFromURL();
    if (!ticketID)
        return null;

    // Get the app ID
    const appID = getAppIDFromURL();
    if (!appID)
        return null;

    return client.tickets.getTicket(appID, ticketID);
});

export const syncTicketAtom = unwrap(ticketAtom, t => t);

export default function useTicket() {
    return useAtomValue(syncTicketAtom);
}