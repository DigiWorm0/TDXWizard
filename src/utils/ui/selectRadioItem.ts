export default function selectRadioItem(id: string, value?: string, document: Document = window.document) {

    // Check value
    if (value === undefined)
        return;

    // Log
    console.log(`Selecting ${value} in radio group ${id}`);

    // Find the form group
    const formGroup = document.getElementById(`${id}-grp`);
    if (!formGroup)
        throw new Error(`Form group with ID ${id} not found`);

    // Find the radio buttons
    const radioLabels = formGroup.querySelectorAll("label");

    // Iterate through the radio labels
    for (const radioLabel of radioLabels) {
        const _radioLabel = radioLabel as HTMLLabelElement;
        if (_radioLabel.innerText.includes(value)) {
            const radioButton = _radioLabel.querySelector("input");
            if (!radioButton)
                throw new Error(`Radio button with value ${value} not found`);
            radioButton.click();
            return;
        }
    }

    // Throw error if no radio button was found
    throw new Error(`Radio button with value ${value} not found`);
}