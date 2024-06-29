/**
 * Selects the ticket status in the dropdown.
 * Requires the page to be a ticket edit page.
 * @param status - The status to select
 */
export default function selectTicketStatus(status: string) {
    // Get the status dropdown
    const selectDropdown = document.getElementById("attribute40") as HTMLSelectElement;
    if (!selectDropdown)
        throw new Error("Status dropdown not found");

    // Iterate through the options and select the one that matches the status
    for (const option of selectDropdown.children) {
        const _option = option as HTMLOptionElement;
        if (_option.innerText === status) {
            selectDropdown.value = _option.value;
        }
    }
}