import {useAtomValue} from "jotai";
import getAppIDFromURL from "../tdx-api/utils/getAppIDFromURL";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import {unwrap} from "jotai/utils";
import atomWithCache from "../utils/atomWithCache";
import handleError from "../utils/handleError";

const appID = getAppIDFromURL();

export const ticketTypesAtom = atomWithCache(`ticketTypes-${appID}`, async () => {
    // Check if the app ID is available
    if (!appID)
        return null;

    // Fetch the ticket type from the API
    const client = new LocalTDXClient();
    return await client.ticketTypes.getTicketTypes(appID)
        .catch(e => handleError("Error fetching ticket types", e));
});

export const syncTicketTypesAtom = unwrap(ticketTypesAtom, t => t);

export default function useTicketTypes() {
    return useAtomValue(syncTicketTypesAtom);
}