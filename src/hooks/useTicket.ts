import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import getTicketIDFromURL from "../tdx-api/utils/getTicketIDFromURL";
import getAppIDFromURL from "../tdx-api/utils/getAppIDFromURL";
import handleError from "../utils/handleError";

export const ticketAtom = atom(() => {
    const client = new LocalTDXClient();

    // Get the ticket ID
    const ticketID = getTicketIDFromURL();
    if (!ticketID)
        return null;

    // Get the app ID
    const appID = getAppIDFromURL();
    if (!appID)
        return null;

    return client.tickets.getTicket(appID, ticketID)
        .catch((e) => handleError("Error fetching ticket", e));
});

export const syncTicketAtom = unwrap(ticketAtom, t => t);

export default function useTicket() {
    return useAtomValue(syncTicketAtom);
}