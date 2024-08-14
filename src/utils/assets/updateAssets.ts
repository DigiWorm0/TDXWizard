import Asset from "../../tdx-api/types/Asset";
import getAppIDFromURL from "../tdx/getAppIDFromURL";

export default function updateAssets(assets: Asset[]) {
    const appID = getAppIDFromURL();
    const assetIDs = assets.map(asset => asset.ID).join(",");
    const url = `${window.location.origin}/TDNext/Apps/${appID}/Assets/AssetUpdateMultiple?AssetIDs=${assetIDs}`;
    window.open(
        url,
        "_blank",
        "width=800,height=600"
    );
}