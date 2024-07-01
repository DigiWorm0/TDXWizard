import Settings from "../../types/Settings";
import getSettings from "../../utils/settings/getSettings";
import setSetting from "../../utils/settings/setSettings";

/**
 * Adds a switch to the settings modal.
 * @param body - The body of the settings modal.
 * @param label - The label for the switch.
 * @param settingsKey - The key in the settings object.
 * @returns The switch element.
 */
export default function addSettingsSwitch(body: HTMLDivElement, label: string, settingsKey: keyof Settings) {

    // Get Settings
    const settings = getSettings();
    const settingsValue = settings[settingsKey];

    // Create Container
    const containerElement = document.createElement("div");
    containerElement.className = "checkbox";
    body.appendChild(containerElement);

    // Create Label
    const labelElement = document.createElement("label");
    containerElement.appendChild(labelElement);

    // Create Switch
    const switchElement = document.createElement("input") as HTMLInputElement;
    switchElement.type = "checkbox";
    switchElement.checked = settingsValue as boolean;
    switchElement.onchange = () => setSetting(settingsKey, switchElement.checked);
    labelElement.appendChild(switchElement);

    // Create Text
    const textElement = document.createElement("span");
    textElement.innerText = label;
    labelElement.appendChild(textElement);

    return switchElement;
}