import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import getTicketIDFromURL from "../tdx-api/utils/getTicketIDFromURL";
import getAppIDFromURL from "../tdx-api/utils/getAppIDFromURL";
import handleError from "../utils/handleError";

export const ticketFeedAtom = atom(async () => {
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

    try {
        // Get the ticket feed
        const feed = await client.tickets.getTicketFeed(appID, ticketID);

        // Grab the replies
        for (let i = 0; i < feed.length; i++) {
            if (feed[i].RepliesCount > 0)
                feed[i] = await client.feed.getFeed(feed[i].ID);
        }

        return feed;
    } catch (e) {
        return handleError("Failed to fetch ticket feed", e);
    }
});

export const syncTicketFeedAtom = unwrap(ticketFeedAtom, t => t);

export default function useTicketFeed() {
    return useAtomValue(syncTicketFeedAtom);
}