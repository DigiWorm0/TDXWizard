export interface DropdownOption {
    name: string;
    value: string;
}

/**
 * Create a bootstrap dropdown.
 * @param title - The title of the dropdown
 * @param options - The options to display
 * @param onClick - The function to call when an option is clicked. Called with the value of the option.
 * @returns The dropdown container and the button element.
 */
export default function createDropdown(title: string, options: DropdownOption[], onClick: (value: string) => void)
{
    // Container
    const container = document.createElement("li");
    container.className = "btn-group";

    // Button
    const button = document.createElement("button");
    button.className = "btn btn-primary btn-sm dropdown-toggle";
    button.style.margin = "1px 3px";
    button.type = "button";
    button.dataset.toggle = "dropdown";
    container.appendChild(button);

    // Button Icon
    const icon = document.createElement("span");
    icon.className = "fa-solid fa-nopad fa-lg fa-caret-down";
    button.appendChild(icon);

    // Button Text
    const text = document.createElement("span");
    text.innerText = title;
    text.className = "hidden-xs padding-left-xs";
    button.appendChild(text);

    // Menu
    const menu = document.createElement("ul");
    menu.className = "dropdown-menu";
    container.appendChild(menu);

    // Options
    for (const option of options)
    {
        const itemContainer = document.createElement("li");
        menu.appendChild(itemContainer);

        const item = document.createElement("a");
        item.className = "dropdown-item";
        item.href = "#";
        item.innerText = option.name;
        item.onclick = () =>
        {
            onClick(option.value);
            return false;
        }
        itemContainer.appendChild(item);
    }

    // Return
    return {
        container,
        button
    };
}