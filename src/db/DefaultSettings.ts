import Settings from "../types/Settings";
import DefaultCustomTemplates from "./DefaultCustomTemplates";
import {SearchType} from "../types/SearchType";

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

    ticketPrintDefaults: true,
    ticketPrintEnableDetails: true,
    ticketPrintEnableDescription: true,
    ticketPrintEnableRequestor: false,
    ticketPrintEnableTasks: false,
    ticketPrintEnableAssets: true,
    ticketPrintEnableCIs: true,
    ticketPrintEnableFeed: false,

    useNewFeed: true,
    useNewFeedOnTickets: true,
    useNewFeedOnAssets: true,
    useNewFeedOnTicketTasks: true,
    checkForMergedTickets: true,
    checkForTicketTasks: true,
    checkForTicketTaskCompletions: true,
    checkForUserOperations: true,
    mergeAdjacentSystemMessages: true,

    useCustomProfileColor: false,
    customProfileColor: "#000000",

    authKey: "",
    authKeyExpiration: "1970-01-01T00:00:00Z", // Default to epoch time
    autoUpdateAuthKey: true,

    customTemplates: DefaultCustomTemplates,
    enableCustomTemplates: true,
    legacyLookupButton: true,
    bulkInventoryButton: true,
    reverseFeedOrder: false,

    resolveButton: false,
    updateButton: false,

    linkifyAttachments: true,

    suggestFormTypes: true,

    openLinksInNewWindow: true,

    denseStyle: true,
    stripedTableRows: true,

    dashboardAddTicketButton: true,

    useNewSearch: true,
    enableNewSearchAutocomplete: true,
    enableNewSearchAutoDetectQuery: true,
    enableNewSearchHistory: true,

    useCustomColorPalette: false,
    primaryColor: "#6B5CDC",

    customProfileImages: true,

    enableAnimations: true,
    hideTicketBannerMessage: true,

    defaultWindowWidth: 992,
    defaultWindowHeight: 800,

    searchHistoryLimit: 8,

    autoDetectSearchTypes: [
        {type: "Ticket" as SearchType, regexes: ["^\\d{5,8}$"]},        // Ticket ID
        {type: "Person" as SearchType, regexes: ["^.+@"]},              // Email address
        {type: "Asset" as SearchType, regexes: ["^[A-Z0-9]{9,12}$"]}    // Serial Number
    ],
    ticketTypeAliases: {},
    hideTicketTypes: []
};

export default DefaultSettings;