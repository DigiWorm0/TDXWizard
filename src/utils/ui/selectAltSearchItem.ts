import waitFor from "../waitFor";

/**
 * Selects an item in the alternative search dropdown.
 * This is used if the searchbox does not have a dropdown icon on the right.
 * @param searchID - The ID of the search dropdown.
 * @param searchValue - The value to search for and select.
 * @param document - The document to search in.
 */
export default async function selectAltSearchItem(searchID: string, searchValue?: string, document: Document = window.document) {
    // Check if the search value is empty
    if (searchValue === undefined)
        return;

    // Log
    console.log(`Selecting ${searchValue} in search ${searchID}`);

    // Clear the search value if it is empty
    if (searchValue === "") {
        const clearButton = document.getElementById(`${searchID}_clear`) as HTMLButtonElement;
        if (!clearButton)
            throw new Error(`Clear button of ID ${searchID} not found`);
        clearButton.click();
        return;
    }

    // Get the container area
    const containerDiv = document.getElementById(`s2id_${searchID}`) as HTMLDivElement;
    if (!containerDiv)
        throw new Error(`Container with ID ${searchID} not found`);

    // Get the search input
    const searchInput = containerDiv.querySelector("input") as HTMLInputElement;
    if (!searchInput)
        throw new Error(`Search input of ID ${searchID} not found`);

    // Focus the search input
    searchInput.focus();
    searchInput.value = searchValue;
    searchInput.dispatchEvent(new Event("input"));

    // Wait for the search to load
    await waitFor(1000);

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

}