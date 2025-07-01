import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import getAppIDFromURL from "../utils/tdx/getAppIDFromURL";
import getTicketIDFromURL from "../utils/tdx/getTicketIDFromURL";
import getTaskIDFromURL from "../utils/tdx/getTaskIDFromURL";

export const ticketTaskFeedAtom = atom(async () => {
    // API Client
    const client = new UWStoutTDXClient();

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

    // Get the ticket feed
    const feed = await client.ticketTasks.getTicketTaskFeed(appID, ticketID, taskID);

    // Grab the replies
    for (let i = 0; i < feed.length; i++) {
        if (feed[i].RepliesCount > 0)
            feed[i] = await client.feed.getFeed(feed[i].ID);
    }

    return feed;
});

export const syncTicketTaskFeedAtom = unwrap(ticketTaskFeedAtom, t => t);

export default function useTicketTaskFeed() {
    return useAtomValue(syncTicketTaskFeedAtom);
}