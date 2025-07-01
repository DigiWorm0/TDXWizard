import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import getAssetIDFromURL from "../utils/tdx/getAssetIDFromURL";
import getAppIDFromURL from "../utils/tdx/getAppIDFromURL";

export const assetFeedAtom = atom(async () => {
    // API Client
    const client = new UWStoutTDXClient();

    // Get the asset ID
    const assetID = getAssetIDFromURL();
    if (!assetID)
        return null;

    // Get the app ID
    const appID = getAppIDFromURL();
    if (!appID)
        return null;

    // Get the ticket feed
    const feed = await client.assets.getAssetFeed(appID, assetID);

    // Grab the replies
    for (let i = 0; i < feed.length; i++) {
        if (feed[i].RepliesCount > 0)
            feed[i] = await client.feed.getFeed(feed[i].ID);
    }

    return feed;
});

export const syncAssetFeedAtom = unwrap(assetFeedAtom, t => t);

export default function useAssetFeed() {
    return useAtomValue(syncAssetFeedAtom);
}