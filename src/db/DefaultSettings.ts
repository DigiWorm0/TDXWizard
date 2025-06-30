import Settings from "../types/Settings";
import DefaultCustomTemplates from "./DefaultCustomTemplates";

const DefaultSettings: Settings = {
    showStatsButton: true,
    showTicketTypeButtons: true,
    showTicketAssetButtons: true,
    showTicketAssignButtons: true,
    hideAssignButtonsIfAssigned: true,
    hideAssignButtonsIfOpen: true,
    showSurplusButtons: true,

    autoHideTicketTypes: true,
    autoCompleteRecategorizationTask: true,
    autoCloseTicketOnSave: false,
    ticketTypeThreshold: 0.5,

    confirmActions: true,
    unlinkEmails: true,
    selectSelfButton: true,

    showTicketPrintButton: true,
    hideTicketPrintViewButton: true,

    useNewFeed: true,
    useNewFeedOnTickets: true,
    useNewFeedOnAssets: true,
    useNewFeedOnTicketTasks: true,
    mergeAdjacentSystemMessages: true,

    useCustomProfileColor: false,
    customProfileColor: "#000000",

    authKey: "",
    autoUpdateAuthKey: true,

    customTemplates: DefaultCustomTemplates,
    enableCustomTemplates: true,
    legacyLookupButton: true,
    bulkInventoryButton: true,
    reverseFeedOrder: false,

    eStoutPickupButton: true,
    eStoutResolveButton: true,
    resolveButton: false,
    updateButton: false,

    removeCopyURLButton: true,

    linkifyAttachments: true,

    suggestFormTypes: true,

    openLinksInNewWindow: true,

    denseStyle: true,
    stripedTableRows: true,

    dashboardAddTicketButton: true,

    useNewSearch: false,
    enableNewSearchAutocomplete: true,
    enableNewSearchAutoDetectQuery: true,
    enableNewSearchHistory: true,

    useCustomColorPalette: false,
    primaryColor: "#6B5CDC",

    customProfileImages: true,

    enableAnimations: true,
};

export default DefaultSettings;