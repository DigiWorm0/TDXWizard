import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import TicketNavBar from "../components/pages/TicketNavBar";

const URL_PREFIX = "/TDNext/Apps/43/Tickets/TicketDet"

export default class TicketDetailsPage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {
        const ticketNavBar = document.getElementById("divTabHeader");
        if (!ticketNavBar)
            throw new Error("Nav Bar not found");
        addComponentToDOM(ticketNavBar.children[0], <TicketNavBar/>);
    }
}