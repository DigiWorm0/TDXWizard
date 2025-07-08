import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import FormTypeButtons from "../components/ticket/forms/FormTypeButtons";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d*\/Tickets\/New/g;

export default class TicketCreatePage implements PageScript {

    canRun() {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run() {
        TicketCreatePage.addTypeSuggestions();
    }

    static addTypeSuggestions() {

        const formField = document.getElementById("lbl_s2id_autogen2");
        if (!formField)
            throw new Error("Form field not found");

        // Create the form type buttons
        addComponentToDOM(formField.parentElement ?? formField, <FormTypeButtons/>);

    }
}