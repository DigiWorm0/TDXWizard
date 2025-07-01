import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import getTicketIDFromURL from "../utils/tdx/getTicketIDFromURL";
import getAppIDFromURL from "../utils/tdx/getAppIDFromURL";

export const ticketWorkflowAtom = atom(() => {
    const client = new UWStoutTDXClient();

    // Get the ticket ID
    const ticketID = getTicketIDFromURL();
    if (!ticketID)
        return null;

    // Get the app ID
    const appID = getAppIDFromURL();
    if (!appID)
        return null;

    return client.tickets.getTicketWorkflow(appID, ticketID).catch(() => null);
});

export const syncTicketWorkflowAtom = unwrap(ticketWorkflowAtom, t => t);

export default function useTicketWorkflow() {
    return useAtomValue(syncTicketWorkflowAtom);
}