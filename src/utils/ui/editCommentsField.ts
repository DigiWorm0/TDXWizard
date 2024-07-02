
export default function editCommentsField(isPrivate?: boolean, document: Document = window.document) {

    // Handle the private checkbox
    if (isPrivate !== undefined) {

        // Get Checkbox
        const privateCheckbox = document.getElementById("CommentsIsPrivate") as HTMLInputElement;
        if (!privateCheckbox)
            throw new Error("Private checkbox not found.");

        // Set the checkbox value
        if (privateCheckbox.checked !== isPrivate)
            privateCheckbox.click();

        // Clear notified users
        if (isPrivate) {
            const clearButton = document.querySelector("button[title='Remove All']") as HTMLButtonElement;
            if (!clearButton)
                throw new Error("Clear button not found.");

            clearButton.click();
        }
    }
}