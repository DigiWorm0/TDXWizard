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
    autoCloseTicketOnSave: false,
    ticketTypeThreshold: 0.5,

    confirmActions: true,
    unlinkEmails: true,
    selectSelfButton: true,

    showTicketPrintButton: true,
    hideTicketPrintViewButton: true,

    useNewFeed: true,
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
    technicianInitials: "ME",

    eStoutPickupButton: true,
    eStoutResolveButton: true,
    resolveButton: false,

    removeCopyURLButton: true,

    linkifyAttachments: true,

    suggestFormTypes: true,

    openLinksInNewWindow: true,

    denseStyle: true,
    stripedTableRows: true,

    dashboardAddTicketButton: true,
};

export default DefaultSettings;