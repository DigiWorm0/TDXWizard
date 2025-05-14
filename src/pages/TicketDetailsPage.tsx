import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import TicketNavBar from "../components/pages/TicketNavBar";
import ConvertFeedButton from "../components/buttons/ConvertFeedButton";
import getSettings from "../utils/getSettings";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d*\/Tickets\/TicketDet/g;

export default class TicketDetailsPage implements PageScript {

    canRun() {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run() {
        TicketDetailsPage.addNavButtons();
        TicketDetailsPage.replaceFeed();
        TicketDetailsPage.removeCopyButton();
    }

    static addNavButtons() {
        const ticketNavBar = document.getElementById("divTabHeader");
        if (!ticketNavBar)
            throw new Error("Nav Bar not found");
        addComponentToDOM(ticketNavBar.children[0], <TicketNavBar/>);
    }

    static replaceFeed() {
        const feedRow = document.querySelector("#divFeed .pull-right");
        if (!feedRow)
            throw new Error("Feed Row not found");
        addComponentToDOM(feedRow, <ConvertFeedButton/>);
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