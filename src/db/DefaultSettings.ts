import Settings from "../types/Settings";
import DefaultCustomTemplates from "./DefaultCustomTemplates";

const DefaultSettings: Settings = {
    showStatsButton: true,
    showTicketTypeButtons: true,
    showTicketAssignButtons: true,
    hideAssignButtonsIfAssigned: true,
    hideAssignButtonsIfOpen: true,
    showSurplusButtons: true,

    autoHideTicketTypes: true,
    autoCloseTicketOnSave: false,
    ticketTypeThreshold: 0.5,

    confirmActions: true,
    unlinkEmails: true,
    selectSelfButton: true,

    autoPrint: true,
    closePrintViewAfterPrint: true,

    useNewFeed: false,
    mergeAdjacentSystemMessages: true,

    useCustomProfileColor: false,
    customProfileColor: "#000000",

    authKey: "",
    customTemplates: DefaultCustomTemplates
};

export default DefaultSettings;