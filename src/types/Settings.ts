import CustomTemplate from "./CustomTemplate";

export default interface Settings {
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
    autoPrint: boolean;
    closePrintViewAfterPrint: boolean;
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