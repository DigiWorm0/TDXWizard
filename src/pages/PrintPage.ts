import PageScript from "./PageScript";

const URL_PREFIX = "/TDNext/Apps/43/Tickets/TicketDetPrint"

export default class PrintPage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {
        // For future implementation
    }
}