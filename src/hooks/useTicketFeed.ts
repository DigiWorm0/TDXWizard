import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import AppID from "../types/AppID";
import getTicketIDFromURL from "../utils/tdx/getTicketIDFromURL";

export const ticketFeedAtom = atom(async () => {
    // API Client
    const client = new UWStoutTDXClient();

    // Get the ticket ID
    const ticketID = getTicketIDFromURL();
    if (!ticketID)
        return null;

    // Get the ticket feed
    const feed = await client.tickets.getTicketFeed(AppID.Tickets, ticketID);

    // Grab the replies
    for (let i = 0; i < feed.length; i++) {
        if (feed[i].RepliesCount > 0)
            feed[i] = await client.feed.getFeed(feed[i].ID);
    }

    return feed;
});

export const syncTicketFeedAtom = unwrap(ticketFeedAtom, t => t);

export default function useTicketFeed() {
    return useAtomValue(syncTicketFeedAtom);
}