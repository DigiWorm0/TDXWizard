import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import getTicketIDFromURL from "../tdx-api/utils/getTicketIDFromURL";
import getAppIDFromURL from "../tdx-api/utils/getAppIDFromURL";

export const ticketWorkflowAtom = atom(() => {
    const client = new LocalTDXClient();

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