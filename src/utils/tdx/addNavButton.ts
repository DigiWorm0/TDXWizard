export default function addNavButton(
    onClick: () => void,
    buttonText?: string,
    iconName?: string,
    tooltipText?: string
) {
    // Get the Nav Bar
    const navBar = document.getElementById("divTabHeader")?.children[0];
    if (!navBar)
        throw new Error("Nav Bar not found");

    // Nav Item
    const navItem = document.createElement("li");
    navBar.appendChild(navItem);

    // Button
    const button = document.createElement("button");
    button.className = "btn btn-warning btn-sm";
    button.onclick = (e) => {
        e.preventDefault();
        onClick();
    };
    navItem.appendChild(button);

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