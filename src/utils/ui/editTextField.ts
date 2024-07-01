export default function editTextField(id: string, text?: string, document: Document = window.document) {
    // Check if the text is undefined
    if (!text)
        return;

    // Log the text field being edited
    console.log(`Editing text field ${id}`);

    // Get the text field
    const textField = document.getElementById(id) as HTMLInputElement;
    if (!textField)
        throw new Error(`Text field with ID ${id} not found`);

    // Set the text field value
    textField.value = text;
    textField.dispatchEvent(new Event("input"));
}