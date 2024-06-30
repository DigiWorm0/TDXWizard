import getTicketIDFromURL from "./getTicketIDFromURL";

/**
 * Get the asset IDs from a ticket
 * @param ticketID - The ticket ID to get the assets from
 */
export default async function getTicketAssets(ticketID?: string) {
    const _ticketID = ticketID ?? getTicketIDFromURL();
    if (!_ticketID)
        throw new Error("Could not get ticket ID from URL");

    // Open Asset Page as a popup
    const assetURL = `/TDNext/Apps/43/Tickets/TicketAssets?TicketID=${_ticketID}`;
    const assetPage = window.open(assetURL, "assetPage", "width=800,height=600");
    if (!assetPage)
        throw new Error("Could not open asset page");

    // Wait for the asset page to load
    await new Promise(resolve => assetPage.onload = resolve);

    // Get the asset table
    const assetTable = assetPage.document.getElementById("grdItems") as HTMLTableElement;
    if (!assetTable)
        throw new Error("Could not find asset table");

    // Get the asset IDs
    // Skip the first and last rows (header and footer)
    const assets: string[] = [];
    for (let i = 1; i < assetTable.rows.length - 1; i++) {
        const row = assetTable.rows[i];
        const assetID = row.cells[0].innerText.trim();
        if (assetID)
            assets.push(assetID);
    }
    console.log(assets);

    // Close the asset page
    assetPage.close();
    return assets;
}