import CustomTemplate from "./CustomTemplate";

export default interface Settings {
    autoUpdateAuthKey: boolean;
    showStatsButton: boolean;
    showTicketTypeButtons: boolean;
    showTicketAssetButtons: boolean;
    showTicketAssignButtons: boolean;
    hideAssignButtonsIfOpen: boolean;
    hideAssignButtonsIfAssigned: boolean;
    showSurplusButtons: boolean;
    autoHideTicketTypes: boolean;
    autoCompleteRecategorizationTask: boolean;
    autoCloseTicketOnSave: boolean;
    ticketTypeThreshold: number;
    confirmActions: boolean;
    unlinkEmails: boolean;
    selectSelfButton: boolean;
    showTicketPrintButton: boolean;

    ticketPrintDefaults: boolean;
    ticketPrintEnableDetails: boolean;
    ticketPrintEnableDescription: boolean;
    ticketPrintEnableRequestor: boolean;
    ticketPrintEnableTasks: boolean;
    ticketPrintEnableAssets: boolean;
    ticketPrintEnableCIs: boolean;
    ticketPrintEnableFeed: boolean;


    hideTicketPrintViewButton: boolean;
    useNewFeed: boolean;
    useNewFeedOnTickets: boolean;
    useNewFeedOnAssets: boolean;
    useNewFeedOnTicketTasks: boolean;
    reverseFeedOrder: boolean;
    mergeAdjacentSystemMessages: boolean;
    useCustomProfileColor: boolean;
    customProfileColor: string;
    authKey: string;
    customTemplates: CustomTemplate[];
    enableCustomTemplates: boolean;
    legacyLookupButton: boolean;
    bulkInventoryButton: boolean;
    resolveButton: boolean;
    updateButton: boolean;
    removeCopyURLButton: boolean;
    linkifyAttachments: boolean;
    suggestFormTypes: boolean;
    openLinksInNewWindow: boolean;

    denseStyle: boolean;
    stripedTableRows: boolean;

    dashboardAddTicketButton: boolean;
    useNewSearch: boolean;
    enableNewSearchAutocomplete: boolean;
    enableNewSearchAutoDetectQuery: boolean;
    enableNewSearchHistory: boolean;

    useCustomColorPalette: boolean;
    primaryColor: string;
    customProfileImages: boolean;

    enableAnimations: boolean;
    hideTicketBannerMessage: boolean;
}