/**
 * Adds a button to the ticket nav bar
 * @param onClick - The function to call when the button is clicked
 * @param buttonText - The text to display on the button
 * @param iconName - The name of the icon to display on the button. Uses the FontAwesome icon set with the "fa-" prefix removed.
 * @param tooltipText - The text to display when the user hovers over the button
 */
export default function addNavButton(
    onClick: () => void,
    buttonText?: string,
    iconName?: string,
    tooltipText?: string
) {
    // Get the Nav Bar
    const assetNavBar = document.getElementById("divButtons");
    const ticketNavBar = document.getElementById("divTabHeader")?.children[0];

    // Nav Item
    let navItem: HTMLLIElement | undefined = undefined;
    if (ticketNavBar) {
        navItem = document.createElement("li");
        ticketNavBar.appendChild(navItem);
    }

    // Button
    const button = document.createElement("button");
    button.className = "btn btn-warning btn-sm";
    button.onclick = (e) => {
        e.preventDefault();
        onClick();
    };

    navItem?.appendChild(button);
    assetNavBar?.appendChild(button);

    // Icon
    if (iconName) {
        const icon = document.createElement("span");
        icon.className = `fa fa-solid fa-${iconName} fa-nopad`;
        button.appendChild(icon);
    }

    // Text
    if (buttonText) {
        const text = document.createElement("span");
        text.className = "hidden-xs padding-left-xs";
        text.innerText = buttonText;
        button.appendChild(text);
    }

    // Tooltip
    if (tooltipText) {
        button.title = tooltipText;
    }

    return button;
}