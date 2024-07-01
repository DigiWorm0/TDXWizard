export default function editTextArea(title: string, text?: string, document: Document = window.document) {
    // Check if the text is undefined
    if (!text)
        return;

    // Log the text area being edited
    console.log(`Editing text area ${title}`);

    // Get the text area
    const textArea = document.querySelector(`iframe[title="${title}"]`) as HTMLIFrameElement;
    if (!textArea)
        throw new Error(`Text area with title ${title} not found`);

    // Get the document of the frame
    const textDocument = textArea.contentDocument;
    if (!textDocument)
        throw new Error("Text document not found.");

    // Get the text body
    const textBody = textDocument.body;
    if (!textBody)
        throw new Error("Text body not found.");

    // Set the text
    textBody.innerHTML = text;
    textBody.dispatchEvent(new Event("change"));
}