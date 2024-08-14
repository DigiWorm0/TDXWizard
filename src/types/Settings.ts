import CustomTemplate from "./CustomTemplate";

export default interface Settings {
    autoUpdateAuthKey: boolean;
    showStatsButton: boolean;
    showTicketTypeButtons: boolean;
    showTicketAssignButtons: boolean;
    hideAssignButtonsIfOpen: boolean;
    hideAssignButtonsIfAssigned: boolean;
    showSurplusButtons: boolean;
    autoHideTicketTypes: boolean;
    autoCloseTicketOnSave: boolean;
    ticketTypeThreshold: number;
    confirmActions: boolean;
    unlinkEmails: boolean;
    selectSelfButton: boolean;
    showTicketPrintButton: boolean;
    hideTicketPrintViewButton: boolean;
    useNewFeed: boolean;
    reverseFeedOrder: boolean;
    mergeAdjacentSystemMessages: boolean;
    useCustomProfileColor: boolean;
    customProfileColor: string;
    authKey: string;
    customTemplates: CustomTemplate[];
    enableCustomTemplates: boolean;
    legacyLookupButton: boolean;
    bulkInventoryButton: boolean;
}