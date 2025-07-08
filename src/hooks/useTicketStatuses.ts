import {useAtomValue} from "jotai";
import getAppIDFromURL from "../tdx-api/utils/getAppIDFromURL";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import {unwrap} from "jotai/utils";
import atomWithCache from "../utils/atomWithCache";
import handleError from "../utils/handleError";

const appID = getAppIDFromURL();

export const ticketStatusesAtom = atomWithCache(`ticketStatuses-${appID}`, async () => {
    // Check if the app ID is available
    if (!appID)
        return null;

    // Fetch the ticket status from the API
    const client = new LocalTDXClient();
    return await client.tickets.getTicketStatuses(appID)
        .catch(e => handleError("Error fetching ticket status info", e));
}, {
    cacheTime: 1000 * 60 * 5 // 5 minutes
});

export const syncTicketStatusesAtom = unwrap(ticketStatusesAtom, t => t);

export default function useTicketStatuses() {
    return useAtomValue(syncTicketStatusesAtom);
}