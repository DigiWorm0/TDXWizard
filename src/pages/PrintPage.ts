import PageScript from "./PageScript";
import getSettings from "../utils/getSettings";

const URL_PREFIX = "/TDNext/Apps/43/Tickets/TicketDetPrint"

export default class PrintPage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {
        const settings = getSettings();


        // Auto print on load
        if (settings.autoPrint) {
            window.print();

            // Close print view after dialog is closed
            if (settings.closePrintViewAfterPrint)
                window.onfocus = () => setTimeout(() => window.close(), 100);
        }
    }
}