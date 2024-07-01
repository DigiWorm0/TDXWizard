import getTicketIDFromURL from "./getTicketIDFromURL";
import selectDropdownItem from "../ui/selectDropdownItem";
import waitFor from "../waitFor";
import TicketUpdate from "../../types/TicketUpdate";
import editCommentsField from "../ui/editCommentsField";
import selectRadioItem from "../ui/selectRadioItem";
import getSettings from "../settings/getSettings";

/**
 * Updates a ticket in TDX. Note: Not all fields are supported
 * @param ticketInfo - The ticket to update. Include the ID to specify a different ticket
 */
export default async function updateTicket(ticketInfo: TicketUpdate) {

    // Get the ticket ID from the URL if not provided.
    const _ticketID = ticketInfo.id || getTicketIDFromURL();
    if (!_ticketID)
        throw new Error("Ticket ID not found.");

    // Open the ticket edit page as a popup
    const ticketURL = `/TDNext/Apps/43/Tickets/Update?TicketID=${_ticketID}`;
    const ticketPage = window.open(ticketURL, "ticketPage", "width=800,height=600");
    if (!ticketPage)
        throw new Error("Could not open ticket page.");

    // Wait for the ticket page to load
    await new Promise(resolve => ticketPage.onload = resolve);

    // Select the ticket values
    selectDropdownItem("NewStatusId", ticketInfo.status, ticketPage.document);
    editCommentsField(ticketInfo.comments, ticketInfo.isPrivate, ticketPage.document);
    const isPickedUp = ticketInfo.isPickedUp !== undefined ? (ticketInfo.isPickedUp ? "Yes" : "No") : undefined;
    selectRadioItem("attribute14087", isPickedUp, ticketPage.document);

    // Save Changes
    const saveButton = document.getElementById("btnSubmit");
    if (!saveButton)
        throw new Error("Save button not found");
    saveButton.click();
    await waitFor(1000);

    // Close the ticket page
    ticketPage.close();

    // Refresh/close the current page
    const settings = getSettings();
    if (settings.autoCloseTicketOnSave)
        window.close();
    else
        window.location.reload();
}