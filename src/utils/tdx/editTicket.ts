import getTicketIDFromURL from "./getTicketIDFromURL";
import TicketInfo from "../../types/TicketInfo";
import selectDropdownItem from "../ui/selectDropdownItem";
import selectSearchItem from "../ui/selectSearchItem";
import selectMultiSearchItem from "../ui/selectMultiSearchItem";
import selectTicketAssignment from "../ui/selectTicketAssignment";
import waitFor from "../waitFor";
import getSettings from "../../hooks/settings/getSettings";

/**
 * Edit a ticket in TDX. Note: Not all fields are supported
 * @param ticketInfo - The ticket to edit. Include the ID to specify a different ticket
 */
export default async function editTicket(ticketInfo: Partial<TicketInfo>) {

    // Get the ticket ID from the URL if not provided.
    const _ticketID = ticketInfo.id || getTicketIDFromURL();
    if (!_ticketID)
        throw new Error("Ticket ID not found.");

    // Open the ticket edit page as a popup
    const ticketURL = `/TDNext/Apps/43/Tickets/Edit?TicketID=${_ticketID}`;
    const ticketPage = window.open(ticketURL, "ticketPage", "width=800,height=600");
    if (!ticketPage)
        throw new Error("Could not open ticket page.");

    // Wait for the ticket page to load
    await new Promise(resolve => ticketPage.onload = resolve);

    // Select the ticket values
    selectDropdownItem("attribute40", ticketInfo.status, ticketPage.document);
    await selectSearchItem("attribute39", ticketInfo.type, ticketPage.document);
    await selectMultiSearchItem("attribute1258", ticketInfo.tags, ticketPage.document);
    await selectTicketAssignment(ticketInfo.responsibility, ticketPage.document);

    // Alert on save
    ticketPage.onload = () => alert("Ticket saved!");

    // Save Changes
    await waitFor(500);
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