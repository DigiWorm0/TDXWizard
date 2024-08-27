import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import {unwrap} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import getAppIDFromURL from "../utils/tdx/getAppIDFromURL";
import getAssetIDFromURL from "../utils/tdx/getAssetIDFromURL";

export const assetAtom = atom(async () => {
    // API Client
    const client = new UWStoutTDXClient();


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