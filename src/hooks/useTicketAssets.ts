import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import AppID from "../types/AppID";
import getTicketIDFromURL from "../utils/tdx/getTicketIDFromURL";

export const ticketAssetsAtom = atom(async () => {
    // API Client
    const client = new UWStoutTDXClient();

    // Get the ticket ID
    const ticketID = getTicketIDFromURL();
    if (!ticketID)
        return null;

    // Get the ticket feed
    return await client.tickets.getTicketAssets(AppID.Tickets, ticketID);
});

export const syncTicketAssetsAtom = unwrap(ticketAssetsAtom, t => t);

export default function useTicketAssets() {
    return useAtomValue(syncTicketAssetsAtom);
}