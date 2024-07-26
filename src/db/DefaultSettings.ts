import Settings from "../types/Settings";

const DefaultSettings: Settings = {
    showStatsButton: true,
    showTicketTypeButtons: true,
    showTicketAssignButtons: true,
    showSurplusButtons: true,

    autoHideTicketTypes: true,
    autoCloseTicketOnSave: false,
    ticketTypeThreshold: 0.5,

    confirmActions: true,
    unlinkEmails: true,

    autoPrint: true,
    useNewFeed: false,

    authKey: ""
};

export default DefaultSettings;