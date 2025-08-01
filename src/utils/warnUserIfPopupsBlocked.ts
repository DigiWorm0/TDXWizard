import toast from "react-hot-toast";
import handleError from "./handleError";

type PopupWindow = Window | null | undefined;

const POLL_INTERVAL = 500; // Check every 500 milliseconds
const POPUP_TIMEOUT = 5000; // Wait 5 seconds before failing

/**
 * Checks if popups are blocked in the browser.
 * If popups are blocked, displays a toast notification.
 * This should be called after attempting to open a popup window.
 *
 * @param popupWindow - The window object returned by `window.open()`, optional.
 */
export default function warnUserIfPopupsBlocked(popupWindow: PopupWindow): void {
    checkPopupsBlocked(popupWindow)
        .then(blocked => {
            if (blocked)
                toast.error("Popups are blocked in your browser. Allow popups in the top-right corner.", {
                    duration: 5000
                });
        })
        .catch((e) => handleError("Error checking if popups are blocked", e));
}

/**
 * Check if popups are blocked in the browser.
 * Waits for the window to load or for `POPUP_TIMEOUT`.
 * Should be called after `window.open()`
 *
 * @notes Based on https://stackoverflow.com/questions/668286/detect-blocked-popup-in-chrome/1089792
 *
 * @param popupWindow - The window object to check, callback from `window.open()`
 * @return True if popups are blocked, false otherwise
 */
export async function checkPopupsBlocked(popupWindow: PopupWindow): Promise<boolean> {
    const startTime = Date.now();

    while (Date.now() - startTime < POPUP_TIMEOUT) {
        // Check if the popup window was opened successfully
        if (checkWindowOpened(popupWindow))
            return false;

        // Wait for the specified interval before checking again
        await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
    }

    // If we reach here, the popup was not opened successfully within the timeout period
    return true;
}

/**
 * Checks if a popup window was opened successfully. Called every `POLL_INTERVAL` by `warnUserIfPopupsBlocked()`
 * @param popupWindow - The window object to check, callback from `window.open()`
 * @return True if the popup window was opened successfully, false if it is still loading or blocked
 */
function checkWindowOpened(popupWindow: PopupWindow): boolean {

    try {
        // Blocked by Safari
        if (!popupWindow)
            return false;

        // Opened & closed immediately
        if (popupWindow.closed)
            return true;

        // Opened successfully
        // if (popupWindow.document &&
        //     (popupWindow.document.readyState === "complete" || popupWindow.document.readyState === "interactive"))
        return true;
    } catch (e) {
        // Cross-origin error, default to true.
        return true;
    }

    // Still loading
    // return false;
}