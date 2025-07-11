import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import TicketNavBar from "../components/ticket/navbar/TicketNavBar";
import ConvertFeedButton from "../components/betterfeed/ConvertFeedButton";
import EditableTicketTitle from "../components/ticket/EditableTicketTitle";
import getSettings from "../utils/getSettings";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d*\/Tickets\/TicketDet(?!Print)/g;

export default class TicketDetailsPage implements PageScript {

    canRun() {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run() {
        TicketDetailsPage.addEditableTitle();
        TicketDetailsPage.addNavButtons();
        TicketDetailsPage.replaceFeed();
    }

    static addEditableTitle() {
        // Check settings
        const settings = getSettings();
        if (!settings.editableTicketTitle)
            return;

        // Get the title element from the DOM
        const titleElement = document.getElementById("thTicket_spnTitle");
        if (!titleElement || !titleElement.parentElement)
            throw new Error("Title element not found");

        // Add the editable title component
        const editableTitle = addComponentToDOM(titleElement.parentElement, <EditableTicketTitle/>);

        // Move the editable title to the front of the title row
        titleElement.parentElement.insertBefore(editableTitle, titleElement.parentElement.firstChild);

        // Change the display to prevent flickering
        editableTitle.style.display = "block";
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