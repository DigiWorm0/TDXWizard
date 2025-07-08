import Asset from "../../tdx-api/types/Asset";
import openWindow from "../openWindow";

/**
 * Opens a new window to update multiple assets in the TDX system.
 * @param appID - The ID of the application to which the assets belong.
 * @param assets - An array of Asset objects to be updated.
 */
export default function updateAssets(appID: number, assets: Asset[]) {
    const assetIDs = assets.map(asset => asset.ID).join(",");
    const url = `${window.location.origin}/TDNext/Apps/${appID}/Assets/AssetUpdateMultiple?AssetIDs=${assetIDs}`;
    openWindow(url, "Update Assets");
}