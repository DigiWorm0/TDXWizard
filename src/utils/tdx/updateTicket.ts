import getTicketIDFromURL from "./getTicketIDFromURL";
import selectDropdownItem from "../ui/selectDropdownItem";
import waitFor from "../waitFor";
import TicketUpdate from "../../types/TicketUpdate";
import selectRadioItem from "../ui/selectRadioItem";
import getSettings from "../settings/getSettings";
import editTextArea from "../ui/editTextArea";
import selectCheckbox from "../ui/selectCheckbox";

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
    await waitFor(500);

    // Select the ticket values
    selectDropdownItem("NewStatusId", ticketInfo.status, ticketPage.document);
    selectCheckbox("CommentsIsPrivate", ticketInfo.isPrivate, ticketPage.document);
    editTextArea("Comments", ticketInfo.comments, ticketPage.document);
    const isPickedUp = ticketInfo.isPickedUp !== undefined ? (ticketInfo.isPickedUp ? "Yes" : "No") : undefined;
    selectRadioItem("attribute14087", isPickedUp, ticketPage.document);

    // Clear Notified Users
    const clearButton = ticketPage.document.querySelector<HTMLButtonElement>('button[title="Remove All"]');
    if (!clearButton)
        throw new Error("Clear button not found.");
    clearButton.click();

    // Save Changes
    const saveButton = ticketPage.document.getElementById("btnSubmit");
    if (!saveButton)
        throw new Error("Save button not found");
    saveButton.click();

    // Wait for the save to complete
    await new Promise(resolve => ticketPage.addEventListener("unload", resolve))

    // Close the ticket page
    ticketPage.close();

    // Refresh/close the current page
    const settings = getSettings();
    if (settings.autoCloseTicketOnSave)
        window.close();
    else
        window.location.reload();
}