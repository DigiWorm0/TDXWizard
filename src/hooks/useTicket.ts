import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import AppID from "../types/AppID";
import getTicketIDFromURL from "../utils/tdx/getTicketIDFromURL";

export const ticketAtom = atom(() => {
    const client = new UWStoutTDXClient();
    const ticketID = getTicketIDFromURL();
    if (!ticketID)
        return null;
    return client.tickets.getTicket(AppID.Tickets, ticketID);
});

export const syncTicketAtom = unwrap(ticketAtom, t => t);

export default function useTicket() {
    return useAtomValue(syncTicketAtom);
}