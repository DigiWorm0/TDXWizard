import PageScript from "./PageScript";
import getSettings from "../utils/getSettings";
import Settings from "../types/Settings";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d*\/Tickets\/TicketDetPrint/g;

const SETTING_TO_ID: Partial<Record<keyof Settings, string>> = {
    "ticketPrintEnableDetails": "chkPrintDetails",
    "ticketPrintEnableDescription": "chkPrintDescription",
    "ticketPrintEnableRequestor": "chkPrintContact",
    "ticketPrintEnableTasks": "chkPrintTasks",
    "ticketPrintEnableAssets": "chkPrintAssets",
    "ticketPrintEnableCIs": "chkPrintOtherCIs",
    "ticketPrintEnableFeed": "chkPrintFeed"
};

export default class TicketPrintPage implements PageScript {

    canRun() {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run() {
        TicketPrintPage.setDefaults();
    }

    static setDefaults() {
        const settings = getSettings();

        // Abort if disabled
        if (!settings.ticketPrintDefaults)
            return;

        // Iterate over applicable settings and their corresponding element IDs
        for (const [settingKey, elementId] of Object.entries(SETTING_TO_ID)) {

            // Find cooresponding setting and element
            const setting = settingKey as keyof Settings;
            const element = document.getElementById(elementId) as HTMLInputElement | null;
            if (!element) {
                console.warn(`Element with ID ${elementId} not found.`);
                continue;
            }

            // Set the checked state based on the setting
            element.checked = settings[setting] as boolean;

            // Send a change event to ensure the UI updates
            const event = new Event("change", {bubbles: true});
            element.dispatchEvent(event);
        }
    }
}