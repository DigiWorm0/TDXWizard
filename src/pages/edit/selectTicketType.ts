import TicketType from "../../types/TicketType";
import waitFor from "../../utils/waitFor";

export default async function selectTicketType(ticketType: TicketType) {
    console.log("Selecting ticket type: " + ticketType);

    // Open the dropdown
    const typeDropdown = document.getElementById("s2id_attribute39");
    const typeDropdownBtn = typeDropdown?.children[0];
    typeDropdownBtn?.dispatchEvent(new Event("mousedown"));

    // Search for the type
    const typeInputA = document.getElementById("s2id_autogen10_search");
    const typeInputB = document.getElementById("s2id_autogen3_search");
    const typeInputC = document.getElementById("s2id_autogen2_search");
    const typeInput = (typeInputA || typeInputB || typeInputC || null) as HTMLInputElement;

    if (!typeInput)
        throw new Error("Type input not found");

    typeInput.value = ticketType;
    typeInput.dispatchEvent(new Event("input"));

    // Wait for the dropdown to load
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
    typeInput.dispatchEvent(keyboardEvent);
}