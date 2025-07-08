import Asset from "../../tdx-api/types/Asset";
import openWindow from "../openWindow";

/**
 * Opens a new window to create a ticket with selected assets in the TDX system.
 * @param appID - The ID of the application to which the assets belong.
 * @param assets - An array of Asset objects to be included in the ticket.
 */
export default function createTicketWithAssets(appID: number, assets: Asset[]) {
    const assetIDs = assets.map(asset => asset.ID).join(",");
    const url = `${window.location.origin}/TDNext/Apps/${appID}/Tickets/SelectAppClassification.aspx?AssetIDs=${assetIDs}`;
    openWindow(url, "Create Ticket with Assets");
}