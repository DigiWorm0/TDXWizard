export default function selectCheckbox(name: string, value?: boolean, document: Document = window.document) {
    // Check if the value is undefined
    if (value === undefined)
        return;

    // Log the selected checkbox
    console.log(`Selecting ${name} checkbox`);

    // Get the checkbox
    const checkbox = document.getElementsByName(name)[0] as HTMLInputElement;
    if (!checkbox)
        throw new Error(`Checkbox with name ${name} not found`);

    // Set the checkbox value
    if (checkbox.checked !== value)
        checkbox.click();
}