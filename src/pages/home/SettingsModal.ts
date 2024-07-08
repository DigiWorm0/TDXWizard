import addSettingsSwitch from "./addSettingsSwitch";
import createModal from "../../utils/ui/createModal";

export default class SettingsModal {
    _parentModal: HTMLDivElement;

    constructor() {
        // Create Modal
        const { parentModal, modalBody } = createModal("TDXBuddy Settings");
        this._parentModal = parentModal;

        // Add Settings
        addSettingsSwitch(modalBody, "Auto Close Ticket on Save", "autoCloseTicketOnSave");
        addSettingsSwitch(modalBody, "User Confirm Actions", "confirmActions");
        addSettingsSwitch(modalBody, "Unlinkify Emails/Phones", "unlinkEmails");
        addSettingsSwitch(modalBody, "Show Surplus Buttons", "showSurplusButtons");
        addSettingsSwitch(modalBody, "Show Ticket Assign Buttons", "showTicketAssignButtons");
        addSettingsSwitch(modalBody, "Show Ticket Type Buttons", "showTicketTypeButtons");
    }

    open() {
        $(this._parentModal).modal("show");
    }

    close() {
        $(this._parentModal).modal("hide");
    }
}