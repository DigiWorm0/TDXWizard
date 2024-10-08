import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import AppID from "../types/AppID";
import getTicketIDFromURL from "../utils/tdx/getTicketIDFromURL";

export const ticketWorkflowAtom = atom(() => {
    const client = new UWStoutTDXClient();
    const ticketID = getTicketIDFromURL();
    if (!ticketID)
        return null;
    return client.tickets.getTicketWorkflow(AppID.Tickets, ticketID).catch(() => null);
});

export const syncTicketWorkflowAtom = unwrap(ticketWorkflowAtom, t => t);

export default function useTicketWorkflow() {
    return useAtomValue(syncTicketWorkflowAtom);
}