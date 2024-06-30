import waitFor from "../waitFor";

/**
 * Selects multiple items in a multi-search dropdown.
 * Primarily used for selecting multiple ticket tags.
 * @param searchID - The ID of the multi-search dropdown.
 * @param searchValues - The values to search for and select.
 * @param document - The document to search in.
 */
export default async function selectMultiSearchItem(searchID: string, searchValues?: string[], document: Document = window.document) {
    // Check if the search value is empty
    if (searchValues === undefined)
        return;

    // Log
    console.log(`Selecting ${searchValues} in multi-search ${searchID}`);

    // Get the container area
    const containerDiv = document.getElementById(`s2id_${searchID}`) as HTMLDivElement;
    if (!containerDiv)
        throw new Error(`Container with ID ${searchID} not found`);

    // Get the input area
    const searchInput = containerDiv.querySelector("input");
    if (!searchInput)
        throw new Error(`Search input of ID ${searchID} not found`);

    // TODO: Clear the search values if it is empty

    // Iterate through the search values
    for (const searchValue of searchValues) {
        // Use the input
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

}