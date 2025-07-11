import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import getAppIDFromURL from "../tdx-api/utils/getAppIDFromURL";
import getTicketIDFromURL from "../tdx-api/utils/getTicketIDFromURL";
import getTaskIDFromURL from "../tdx-api/utils/getTaskIDFromURL";
import handleError from "../utils/handleError";

export const ticketTaskFeedAtom = atom(async () => {
    // API Client
    const client = new LocalTDXClient();

    // Get the task ID
    const taskID = getTaskIDFromURL();
    if (!taskID)
        return null;

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
        const feed = await client.ticketTasks.getTicketTaskFeed(appID, ticketID, taskID);

        // Grab the replies
        for (let i = 0; i < feed.length; i++) {
            if (feed[i].RepliesCount > 0)
                feed[i] = await client.feed.getFeed(feed[i].ID);
        }

        return feed;
    } catch (e) {
        return handleError("Failed to fetch ticket task feed", e);
    }
});

export const syncTicketTaskFeedAtom = unwrap(ticketTaskFeedAtom, t => t);

export default function useTicketTaskFeed() {
    return useAtomValue(syncTicketTaskFeedAtom);
}