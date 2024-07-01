import TicketCreate from "../../types/TicketCreate";
import selectSearchItem from "../ui/selectSearchItem";
import selectCheckbox from "../ui/selectCheckbox";
import editTextField from "../ui/editTextField";
import editTextArea from "../ui/editTextArea";
import selectMultiSearchItem from "../ui/selectMultiSearchItem";
import selectDropdownItem from "../ui/selectDropdownItem";
import waitFor from "../waitFor";
import scrapeTicketInfo from "../../pages/ticketDetails/scrapeTicketInfo";
import addAssetToTicket from "./addAssetToTicket";

const INCIDENT_FORM_ID = 33;

/**
 * Creates a ticket in TDX with the given information.
 * @param ticketInfo - The ticket information
 */
export default async function makeTicket(ticketInfo: TicketCreate) {

    // Open the ticket create page as a popup
    const ticketURL = `/TDNext/Apps/43/Tickets/New?formId=${INCIDENT_FORM_ID}`; // TODO: Support other forms
    const ticketPage = window.open(ticketURL, "ticketPage", "width=800,height=600");
    if (!ticketPage)
        throw new Error("Could not open ticket page.");

    // Wait for the ticket page to load
    await new Promise(resolve => ticketPage.onload = resolve);

    // Select the ticket values
    await selectSearchItem("attribute495", ticketInfo.requester, ticketPage.document);              // Requester
    selectCheckbox("Item.NotifyRequestor", ticketInfo.notifyRequester, ticketPage.document);  // Notify Requester
    editTextField("attribute37", ticketInfo.title, ticketPage.document);                            // Title
    editTextArea("Description", ticketInfo.description, ticketPage.document);                       // Description
    await selectSearchItem("attribute39", ticketInfo.type, ticketPage.document);                    // Type
    await selectMultiSearchItem("attribute1258", ticketInfo.tags, ticketPage.document);             // Tags
    // TODO: "Does this affect a room"
    await selectSearchItem("attribute1279", ticketInfo.responsibility, ticketPage.document);        // Responsibility
    selectCheckbox("Item.NotifyResponsible", ticketInfo.notifyResponsible, ticketPage.document);    // Notify Responsible
    selectDropdownItem("attribute40", ticketInfo.status, ticketPage.document);                      // Status
    selectDropdownItem("attribute371", ticketInfo.sourceName, ticketPage.document);                 // Source

    // Save Changes
    const saveButton = ticketPage.document.getElementById("btnSubmit");
    if (!saveButton)
        throw new Error("Save button not found");
    saveButton.click();
    await waitFor(2000);

    // View the ticket
    const allLinks = ticketPage.document.getElementsByTagName("a");
    for (let i = 0; i < allLinks.length; i++) {
        if (allLinks[i].innerText.includes("View the incident")) {
            allLinks[i].click();
            break;
        }
    }

    // Get the new ticket info
    const newTicketInfo = scrapeTicketInfo(ticketPage.document);
    console.log("New Ticket Info: ", newTicketInfo);

    // Add asset to ticket
    await addAssetToTicket(newTicketInfo.id, ticketInfo.assetName);

    return newTicketInfo;
}