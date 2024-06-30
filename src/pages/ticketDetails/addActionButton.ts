/**
 * Add an action button to the ticket details actions dropdown
 * @param onClick - The function to run when the button is clicked
 * @param buttonText - The text to display on the button
 */
export default function addActionButton(
    onClick: () => void,
    buttonText: string
) {
    // Get the Dropdown
    const dropdown = document.getElementById("drpActions");
    if (!dropdown)
        throw new Error("Dropdown not found");

    // Get the ul element
    const dropdownList = dropdown.querySelector("ul");
    if (!dropdownList)
        throw new Error("Dropdown list not found");

    // Nav Item
    const dropdownItem = document.createElement("li");
    dropdownItem.onclick = (e) => {
        e.preventDefault();
        onClick();
    }
    dropdownList.appendChild(dropdownItem);

    // Dummy Link
    const dummyLink = document.createElement("a");
    dummyLink.href = "#";
    dummyLink.innerText = buttonText;
    dropdownItem.appendChild(dummyLink);
}