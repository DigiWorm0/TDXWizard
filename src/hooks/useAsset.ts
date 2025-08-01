import LocalTDXClient from "../tdx-api/LocalTDXClient";
import {unwrap} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import getAppIDFromURL from "../tdx-api/utils/getAppIDFromURL";
import getAssetIDFromURL from "../tdx-api/utils/getAssetIDFromURL";
import handleError from "../utils/handleError";
import {myUserHasApplication} from "./useMyUserHasApplication";

export const assetAtom = atom(async (get) => {
    // API Client
    const client = new LocalTDXClient();

    // Get the IDs
    const appID = getAppIDFromURL();
    const assetID = getAssetIDFromURL();
    if (!assetID || !appID)
        return null;

    // Check if the user has access to TDAssets
    if (!get(myUserHasApplication("TDAssets")))
        return null;

    // Get the asset
    return await client.assets.getAsset(appID, assetID)
        .catch(e => handleError("Failed to fetch asset", e));
});
export const syncAssetAtom = unwrap(assetAtom, a => a);

export default function useAsset() {
    return useAtomValue(syncAssetAtom);
}