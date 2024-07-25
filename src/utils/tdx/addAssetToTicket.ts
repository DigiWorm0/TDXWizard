import waitFor from "../waitFor";

/**
 * Adds an asset to a ticket
 * @param ticketID - The ticket ID
 * @param assetName - The asset search query
 */
export default async function addAssetToTicket(ticketID: string, assetName?: string) {

    // Check if the asset name is empty
    if (!assetName)
        return;

    // Open the ticket asset page as a popup
    const ticketURL = `/TDNext/Apps/43/Tickets/TicketAssets?TicketID=${ticketID}`;
    const ticketPage = window.open(ticketURL, "ticketAssets", "width=800,height=600");
    if (!ticketPage)
        throw new Error("Could not open ticket asset page.");

    // Wait for the ticket page to load
    await new Promise(resolve => ticketPage.onload = resolve);

    // Get the add asset button
    const addAssetButton = ticketPage.document.getElementById("btnShowAddDialog") as HTMLButtonElement;
    if (!addAssetButton)
        throw new Error("Add asset button not found");

    // Click the add asset button
    addAssetButton.click();

    // Get the search input
    const searchInput = ticketPage.document.getElementById("taluAddItems_txtinput") as HTMLInputElement;
    if (!searchInput)
        throw new Error("Search input not found");

    // Focus and set the search input
    searchInput.focus();
    searchInput.value = assetName;
    searchInput.dispatchEvent(new Event("input"));
    searchInput.dispatchEvent(new Event("change"));
    searchInput.dispatchEvent(new Event("keyup"));
    searchInput.dispatchEvent(new Event("keypress"));

    // Wait for the search to load
    await waitFor(3000);

    // Select the first item
    const keyboardEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true
    });
    searchInput.dispatchEvent(keyboardEvent);

    // Save the asset
    const saveButton = ticketPage.document.getElementById("btnAddItems") as HTMLButtonElement;
    if (!saveButton)
        throw new Error("Save button not found");
    saveButton.click();

    // Wait for the save to complete
    await waitFor(500);

    // Close the ticket page
    ticketPage.close();

    // Refresh the current page
    window.location.reload();
}