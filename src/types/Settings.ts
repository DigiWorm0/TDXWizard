export default interface Settings {
    showStatsButton: boolean;
    showTicketTypeButtons: boolean;
    showTicketAssignButtons: boolean;
    showSurplusButtons: boolean;

    autoHideTicketTypes: boolean;
    autoCloseTicketOnSave: boolean;
    ticketTypeThreshold: number;

    confirmActions: boolean;
    unlinkEmails: boolean;

    autoPrint: boolean;

    useNewFeed: boolean;

    authKey: string;
}