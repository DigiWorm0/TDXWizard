import waitFor from "../waitFor";
import { setAutoAssignment } from "../../pages/assignmentLookup/autoAssignment";

/**
 * Selects a ticket assignment. Requires the page to be a ticket edit page.
 * Since not all names appear in the search results, this function will open the full search popup to look up all users.
 * @param name - The name of the assignment.
 * @param document - The document to use.
 */
export default async function selectTicketAssignment(name?: string, document: Document = window.document) {

    // Check if the ticket assignment is set
    if (!name)
        return;

    // Log
    console.log("Selecting ticket assignment: " + name);

    // Set the auto assignment
    setAutoAssignment(name);

    // Open search popup
    const searchButton = document.getElementById("attribute1279_lookup") as HTMLButtonElement;
    searchButton.click();

    // Wait for the search to complete
    await waitFor(2500);

    // Notify the user
    const notifyCheckbox = document.getElementsByName("Item.NotifyResponsible")[0] as HTMLInputElement;
    notifyCheckbox.checked = false;
    notifyCheckbox.dispatchEvent(new Event("change"));
}