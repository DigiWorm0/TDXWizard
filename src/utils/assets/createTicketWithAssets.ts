import Asset from "../../tdx-api/types/Asset";

export default function createTicketWithAssets(appID: number, assets: Asset[]) {
    const assetIDs = assets.map(asset => asset.ID).join(",");
    const url = `${window.location.origin}/TDNext/Apps/${appID}/Tickets/SelectAppClassification.aspx?AssetIDs=${assetIDs}`;
    window.open(
        url,
        "_blank",
        "width=800,height=600"
    );
}