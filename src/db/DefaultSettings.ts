import Settings from "../types/Settings";

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

    autoPrint: true,
    closePrintViewAfterPrint: true,

    useNewFeed: false,
    mergeAdjacentSystemMessages: true,

    useCustomProfileColor: false,
    customProfileColor: "#000000",

    authKey: ""
};

export default DefaultSettings;