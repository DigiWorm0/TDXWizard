import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import getAssetIDFromURL from "../tdx-api/utils/getAssetIDFromURL";
import getAppIDFromURL from "../tdx-api/utils/getAppIDFromURL";
import handleError from "../utils/handleError";

export const assetFeedAtom = atom(async () => {
    try {
        // API Client
        const client = new LocalTDXClient();

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
    } catch (e) {
        return handleError("Failed to fetch asset feed", e);
    }
});

export const syncAssetFeedAtom = unwrap(assetFeedAtom, t => t);

export default function useAssetFeed() {
    return useAtomValue(syncAssetFeedAtom);
}