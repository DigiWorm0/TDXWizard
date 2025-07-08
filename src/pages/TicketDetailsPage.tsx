import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import TicketNavBar from "../components/ticket/navbar/TicketNavBar";
import ConvertFeedButton from "../components/betterfeed/ConvertFeedButton";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d*\/Tickets\/TicketDet/g;

export default class TicketDetailsPage implements PageScript {

    canRun() {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run() {
        TicketDetailsPage.addNavButtons();
        TicketDetailsPage.replaceFeed();
    }

    static addNavButtons() {
        const ticketNavBar = document.getElementById("divTabHeader");
        if (!ticketNavBar)
            throw new Error("Nav Bar not found");
        const navButtons = addComponentToDOM(ticketNavBar.children[0], <TicketNavBar/>);
        navButtons.style.display = "inherit";
    }

    static replaceFeed() {
        const feedRow = document.querySelector("#divFeed .pull-right");
        if (!feedRow)
            throw new Error("Feed Row not found");
        addComponentToDOM(feedRow, <ConvertFeedButton type={"ticket"}/>);
    }
}