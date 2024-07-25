import getSettings from "./getSettings";

/**
 * Prompts for confirmation before proceeding. Automatically returns true if disabled in settings.
 * @param text - The text to display in the confirmation dialog.
 * @returns True if the user confirms, false if they cancel.
 */
export default function confirmAction(text?: string) {
    const settings = getSettings();
    if (!settings.confirmActions)
        return true;
    return confirm(text ?? "Are you sure you want to proceed?");
}