import LocalTDXClient from "../tdx-api/LocalTDXClient";
import {unwrap} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import getAppIDFromURL from "../tdx-api/utils/getAppIDFromURL";
import getAssetIDFromURL from "../tdx-api/utils/getAssetIDFromURL";

export const assetAtom = atom(async () => {
    // API Client
    const client = new LocalTDXClient();


    // Get the IDs
    const appID = getAppIDFromURL();
    const assetID = getAssetIDFromURL();
    if (!assetID || !appID)
        return null;

    // Get the asset
    return await client.assets.getAsset(appID, assetID);
});
export const syncAssetAtom = unwrap(assetAtom, a => a);

export default function useAsset() {
    return useAtomValue(syncAssetAtom);
}