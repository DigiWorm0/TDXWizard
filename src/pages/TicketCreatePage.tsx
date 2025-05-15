import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import FormTypeButtons from "../components/buttons/FormTypeButtons";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d*\/Tickets\/New/g;

export default class TicketCreatePage implements PageScript {

    canRun() {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run() {
        TicketCreatePage.addTypeSuggestions();
    }

    static addTypeSuggestions() {
        // Find the ticket form
        const ticketForm = document.getElementById("frmTicketCreate");
        if (!ticketForm)
            throw new Error("Ticket form not found");

        const formTypeTitle = document.getElementById("lbl_s2id_autogen9");
        if (!formTypeTitle)
            throw new Error("Ticket status input not found");

        // Create the form type buttons
        addComponentToDOM(formTypeTitle.parentElement ?? ticketForm, <FormTypeButtons/>);
    }
}