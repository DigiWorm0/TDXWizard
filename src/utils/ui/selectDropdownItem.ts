/**
 * Selects an item in a dropdown by its name
 * @param dropdownID - The ID of the dropdown.
 * @param optionName - The name of the option to select.
 * @param document - The document to search in.
 */
export default function selectDropdownItem(dropdownID: string, optionName?: string, document: Document = window.document) {

    // TODO: Fix me

    // Check if the option name is undefined
    if (!optionName)
        return;

    console.log(`Selecting ${optionName} in dropdown ${dropdownID}`);

    // Get the dropdown
    const selectDropdown = document.getElementById(dropdownID) as HTMLSelectElement;
    if (!selectDropdown)
        throw new Error(`Dropdown with ID ${dropdownID} not found`);

    // Iterate through the options and select the one that matches the status
    for (const option of selectDropdown.children) {
        const _option = option as HTMLOptionElement;
        if (_option.innerText === optionName) {
            selectDropdown.value = _option.value;
        }
    }
}