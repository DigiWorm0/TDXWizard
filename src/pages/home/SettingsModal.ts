import addSettingsSwitch from "./addSettingsSwitch";
import createModal from "../../utils/ui/createModal";
import { GM_info } from "$";
import {i} from "vite/dist/node/types.d-aGj9QkWt";

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

        // Add Version Tag
        const versionTag = document.createElement("div");
        versionTag.style.textAlign = "center";
        versionTag.style.marginTop = "20px";
        versionTag.innerText = `Version: ${GM_info.script.version}`;
        modalBody.appendChild(versionTag);
    }

    open() {
        $(this._parentModal).modal("show");
    }

    close() {
        $(this._parentModal).modal("hide");
    }
}