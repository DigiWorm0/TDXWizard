import PageScript from "./PageScript";
import getSettings from "../utils/getSettings";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d*\/Tickets\//g;

export default class TicketPage implements PageScript {

    canRun() {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run() {
        TicketPage.removeCopyButton();
    }

    static removeCopyButton() {
        // Check Settings
        const {removeCopyURLButton} = getSettings();
        if (!removeCopyURLButton)
            return;

        // Remove Copy Button
        const copyButton = document.getElementById("btnCopyUrl");
        if (copyButton)
            copyButton.remove();
    }
}