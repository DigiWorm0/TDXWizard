import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import FormTypeButtons from "../components/ticket/forms/FormTypeButtons";
import getSettings from "../utils/getSettings";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d*\/Tickets\/(New|Update|Edit)/g;

export default class TicketCreatePage implements PageScript {

    canRun() {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run() {
        TicketCreatePage.disableNotifyResponsible();
        TicketCreatePage.addTypeSuggestions();
    }

    static addTypeSuggestions() {
        const formField = document.getElementById("lbl_s2id_autogen2");
        if (!formField)
            return;

        // Create the form type buttons
        addComponentToDOM(formField.parentElement ?? formField, <FormTypeButtons/>);

    }

    static disableNotifyResponsible() {
        const settings = getSettings();

        // Abort if disabled
        if (!settings.disableNotifyResponsibleByDefault)
            return;

        // Find the notify responsible checkbox
        const notifyResponsible = document.querySelector("input[name='Item.NotifyResponsible']");
        if (!notifyResponsible)
            return;

        // If the notify responsible checkbox is checked, uncheck it
        if (notifyResponsible instanceof HTMLInputElement && notifyResponsible.checked) {
            notifyResponsible.checked = false;
            notifyResponsible.value = "false";
            notifyResponsible.dispatchEvent(new Event("change"));
        }
    }
}