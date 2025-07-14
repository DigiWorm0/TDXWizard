import SettingsSwitchInput from "./input/SettingsSwitchInput";
import ModalBase from "../common/ModalBase";
import SettingsAuthInput from "./input/SettingsAuthInput";
import useSettings from "../../hooks/useSettings";
import SettingsColorPickerInput from "./input/SettingsColorPickerInput";
import SettingsCategoryHeader from "./SettingsCategoryHeader";
import ResetSettingsButton from "./ResetSettingsButton";
import ExportSettingsButton from "./ExportSettingsButton";
import ImportSettingsButton from "./ImportSettingsButton";
import ClearSearchHistoryButton from "./ClearSearchHistoryButton";
import checkIsUWStout from "../../utils/checkIsUWStout";
import SettingsDimensionsInput from "./input/SettingsDimensionsInput";
import SettingsNumberInput from "./input/SettingsNumberInput";
import SettingsTitle from "./SettingsTitle";
import SettingsSidebarImage from "./SettingsSidebarImage";

export interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
    const [settings] = useSettings();

    return (
        <ModalBase
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <div
                className={"modal-dialog"}
                role={"document"}
                style={{maxWidth: 620}}
            >
                <div className={"modal-content"}>
                    <div className={"d-flex flex-row justify-content-start"}>
                        <SettingsSidebarImage/>
                        <div className={"m-2 w-100"}>

                            {/* Header Bar */}
                            <div className={"d-flex flex-row justify-content-between"}>
                                <SettingsTitle/>
                                <button
                                    type={"button"}
                                    className={"close tdx-close-x"}
                                    data-dismiss={"modal"}
                                    aria-label={"Close"}
                                    onClick={props.onClose}
                                    style={{
                                        margin: 10
                                    }}
                                >
                                </button>
                            </div>
                            <hr style={{marginTop: 6, marginBottom: 0}}/>

                            {/* ---- START SETTINGS ---- */}

                            <SettingsCategoryHeader>Common</SettingsCategoryHeader>

                            <SettingsSwitchInput
                                label={"Remove Email Anchors/Links"}
                                setting={"unlinkEmails"}
                                title={"Removes all email links for easier username highlight/copy/paste"}
                            />
                            <SettingsSwitchInput
                                label={"Open Links in a New Window"}
                                setting={"openLinksInNewWindow"}
                                title={"Reverts the tab dashboard with new windows (requires a refresh)"}
                            />

                            <div style={{marginLeft: 20}}>
                                <SettingsDimensionsInput
                                    label={"Popup Size"}
                                    title={"Sets the default size (in pixels) of new window popups"}
                                    xSetting={"defaultWindowWidth"}
                                    ySetting={"defaultWindowHeight"}
                                    disabled={!settings.openLinksInNewWindow}
                                />
                            </div>

                            <SettingsSwitchInput
                                label={"Add Self-Assignment Button"}
                                setting={"selectSelfButton"}
                                title={"Adds a button to all user form fields to select yourself"}
                            />
                            <SettingsSwitchInput
                                label={"Confirm Actions"}
                                setting={"confirmActions"}
                                title={"Adds a confirmation dialog for destructive actions"}
                            />
                            <SettingsSwitchInput
                                label={"Animations"}
                                setting={"enableAnimations"}
                                title={"Animates various UI components such as buttons"}
                            />
                            <SettingsSwitchInput
                                label={"Better Search"}
                                setting={"useNewSearch"}
                                title={"Replaces the TDX search with a re-designed version"}
                            />
                            <div style={{marginLeft: 20}}>
                                <SettingsSwitchInput
                                    label={"Autocomplete"}
                                    setting={"enableNewSearchAutocomplete"}
                                    disabled={!settings.useNewSearch}
                                    title={"Enables auto-complete for the new search bar, suggesting results as you type. Can be disabled if it causes performance issues"}
                                />
                                <SettingsSwitchInput
                                    label={"Auto-Detect Search Query"}
                                    setting={"enableNewSearchAutoDetectQuery"}
                                    disabled={!settings.useNewSearch}
                                    title={"Auto-detects certain types of search queries such as ticket IDs, asset tags, and usernames"}
                                />
                                <SettingsSwitchInput
                                    label={"Search History"}
                                    setting={"enableNewSearchHistory"}
                                    disabled={!settings.useNewSearch}
                                    title={"Saves the last few search queries and allows you to quickly re-open them"}
                                />

                                <div style={{marginLeft: 20}}>
                                    <SettingsNumberInput
                                        label={"Search History Limit"}
                                        setting={"searchHistoryLimit"}
                                        disabled={!settings.enableNewSearchHistory || !settings.useNewSearch}
                                        title={"Sets the maximum number of search history items to keep"}
                                    />
                                </div>
                            </div>

                            <SettingsCategoryHeader>Feed</SettingsCategoryHeader>

                            <SettingsSwitchInput
                                label={"Better Feed"}
                                setting={"useNewFeed"}
                                title={"Replaces the TDX feed with a re-designed version (chronological order, minimize system messages, reply captions/links, etc)"}
                            />
                            <div style={{marginLeft: 20}}>
                                <SettingsSwitchInput
                                    label={"Enable on Tickets"}
                                    setting={"useNewFeedOnTickets"}
                                    disabled={!settings.useNewFeed}
                                    title={"Enables Better Feed on the ticket pages"}
                                />
                                <SettingsSwitchInput
                                    label={"Enable on Inventory Assets"}
                                    setting={"useNewFeedOnAssets"}
                                    disabled={!settings.useNewFeed}
                                    title={"Enables Better Feed on the asset/inventory pages"}
                                />
                                <SettingsSwitchInput
                                    label={"Enable on Ticket Tasks"}
                                    setting={"useNewFeedOnTicketTasks"}
                                    disabled={!settings.useNewFeed}
                                    title={"Enables Better Feed on the ticket task pages"}
                                />

                                <SettingsSwitchInput
                                    label={"Check for Tickets Merges"}
                                    setting={"checkForMergedTickets"}
                                    disabled={!settings.useNewFeed}
                                    title={"Searches for text that indicate a ticket has been merged and replaces them with a merge icon in the feed"}
                                />

                                <SettingsSwitchInput
                                    label={"Check for Ticket Tasks"}
                                    setting={"checkForTicketTasks"}
                                    disabled={!settings.useNewFeed}
                                    title={"Checks if a feed item is a task and replaces the text to make it more intuitive"}
                                />
                                <SettingsSwitchInput
                                    label={"Check for Ticket Task Completions"}
                                    setting={"checkForTicketTaskCompletions"}
                                    disabled={!settings.useNewFeed}
                                    title={"Searches for text that indicate a task has been completed and replaces them with a checkmark icon in the feed"}
                                />

                                <SettingsSwitchInput
                                    label={"Check for User Operations"}
                                    setting={"checkForUserOperations"}
                                    disabled={!settings.useNewFeed}
                                    title={"Searches for text that indicate a user operation and converts them to a small, non-communication item in the feed"}
                                />
                                <SettingsSwitchInput
                                    label={"Merge Adjacent System Messages"}
                                    setting={"mergeAdjacentSystemMessages"}
                                    disabled={!settings.useNewFeed}
                                    title={"Merges adjacent system messages into a single block, regardless of time"}
                                />
                                <SettingsSwitchInput
                                    label={"Reverse Feed Order"}
                                    setting={"reverseFeedOrder"}
                                    disabled={!settings.useNewFeed}
                                    title={"Places older messages on top and newer messages on bottom"}
                                />
                                <SettingsSwitchInput
                                    label={"Linkify Attachments"}
                                    setting={"linkifyAttachments"}
                                    disabled={!settings.useNewFeed}
                                    title={"Converts attachment text into clickable links"}
                                />
                                <SettingsSwitchInput
                                    label={"Custom Profile Images"}
                                    setting={"customProfileImages"}
                                    disabled={!settings.useNewFeed}
                                    title={"Shows/hides users' custom profile images in the feed"}
                                />
                                <SettingsSwitchInput
                                    label={"My Profile Color"}
                                    setting={"useCustomProfileColor"}
                                    disabled={!settings.useNewFeed}
                                    title={"Uses a custom color for your profile in the feed"}
                                />
                                <div style={{marginLeft: 20}}>
                                    <SettingsColorPickerInput
                                        label={"My Profile Color"}
                                        setting={"customProfileColor"}
                                        disabled={!settings.useCustomProfileColor || !settings.useNewFeed}
                                    />
                                </div>
                            </div>

                            <SettingsCategoryHeader>Tickets</SettingsCategoryHeader>

                            <SettingsSwitchInput
                                label={"Automatically Exit Tickets On Action"}
                                setting={"autoCloseTicketOnSave"}
                                title={"Automatically exits the ticket window after completing an action. Useful for bulk actions"}
                            />

                            <SettingsSwitchInput
                                label={"Hide Banner Messages"}
                                setting={"hideTicketBannerMessage"}
                                title={"Hides \"Step Updated\" pop-up messages when updating ticket workflows"}
                            />

                            <SettingsSwitchInput
                                label={"Show Resolve Button"}
                                setting={"resolveButton"}
                                title={"Enables a universal 'Resolve' button on all ticket pages"}
                            />

                            <SettingsSwitchInput
                                label={"Show Update Button"}
                                setting={"updateButton"}
                                title={"Enables a quick 'Update' button on all ticket pages to add a new update without opening the extra drop-down"}
                            />
                            <SettingsSwitchInput
                                label={"Disable Notify Responsible by Default"}
                                setting={"disableNotifyResponsibleByDefault"}
                                title={"Disabled notifying the responsible user by default when creating or updating a ticket"}
                            />

                            <SettingsSwitchInput
                                label={"Suggest Ticket Assignments"}
                                setting={"showTicketAssignButtons"}
                                title={"Suggests assignments for ticket based on the feed"}
                            />
                            <div style={{marginLeft: 20}}>
                                <SettingsSwitchInput
                                    label={"Hide Assignments if Ticket is Open"}
                                    setting={"hideAssignButtonsIfOpen"}
                                    disabled={!settings.showTicketAssignButtons}
                                    title={"Hides the assignment suggestions if the ticket is still open"}
                                />
                                <SettingsSwitchInput
                                    label={"Hide Assignments if Already Assigned"}
                                    setting={"hideAssignButtonsIfAssigned"}
                                    disabled={!settings.showTicketAssignButtons}
                                    title={"Hides the assignment suggestions if the ticket is already assigned to a user (not a group)"}
                                />
                            </div>

                            <SettingsSwitchInput
                                label={"Enable Custom Templates"}
                                setting={"enableCustomTemplates"}
                                title={"Enables custom templates for ticket updates"}
                            />

                            <SettingsSwitchInput
                                label={"Enable Editable Ticket Title"}
                                setting={"editableTicketTitle"}
                                title={"Allows you to edit the ticket title directly from the ticket details page"}
                            />

                            <SettingsCategoryHeader>Printing</SettingsCategoryHeader>

                            <SettingsSwitchInput
                                label={"Add Print Button to Tickets"}
                                setting={"showTicketPrintButton"}
                                title={"Replaces the 'Print View' with a normal 'Print' button"}
                            />
                            <SettingsSwitchInput
                                label={"Hide Print View Button on Tickets"}
                                setting={"hideTicketPrintViewButton"}
                                title={"Hides the default 'Print View' button on the ticket page"}
                            />

                            <SettingsSwitchInput
                                label={"Apply Default Print Settings"}
                                setting={"ticketPrintDefaults"}
                                title={"Automatically applies the default print settings when printing a ticket"}
                            />
                            <div style={{marginLeft: 20}}>
                                <SettingsSwitchInput
                                    label={"Ticket Details"}
                                    setting={"ticketPrintEnableDetails"}
                                    disabled={!settings.ticketPrintDefaults}
                                />
                                <SettingsSwitchInput
                                    label={"Ticket Description"}
                                    setting={"ticketPrintEnableDescription"}
                                    disabled={!settings.ticketPrintDefaults}
                                />
                                <SettingsSwitchInput
                                    label={"Requestor Information"}
                                    setting={"ticketPrintEnableRequestor"}
                                    disabled={!settings.ticketPrintDefaults}
                                />
                                <SettingsSwitchInput
                                    label={"Tasks"}
                                    setting={"ticketPrintEnableTasks"}
                                    disabled={!settings.ticketPrintDefaults}
                                />
                                <SettingsSwitchInput
                                    label={"Assets"}
                                    setting={"ticketPrintEnableAssets"}
                                    disabled={!settings.ticketPrintDefaults}
                                />
                                <SettingsSwitchInput
                                    label={"Configuration Items"}
                                    setting={"ticketPrintEnableCIs"}
                                    disabled={!settings.ticketPrintDefaults}
                                />
                                <SettingsSwitchInput
                                    label={"Feed"}
                                    setting={"ticketPrintEnableFeed"}
                                    disabled={!settings.ticketPrintDefaults}
                                />
                            </div>

                            <SettingsCategoryHeader>Inventory</SettingsCategoryHeader>

                            <SettingsSwitchInput
                                label={"Add Bulk Inventory Button"}
                                setting={"bulkInventoryButton"}
                                title={"Adds a tool to the inventory desktop to update assets in bulk"}
                            />

                            <SettingsCategoryHeader>Style</SettingsCategoryHeader>
                            <SettingsSwitchInput
                                label={"Dense Layout"}
                                setting={"denseStyle"}
                                title={"Reduces padding and margins to fit more information on the screen"}
                            />
                            <SettingsSwitchInput
                                label={"Striped Table Rows"}
                                setting={"stripedTableRows"}
                                title={"Alternates the background color of table rows for better readability"}
                            />

                            {checkIsUWStout() && (
                                <div>
                                    <SettingsCategoryHeader>UW-Stout</SettingsCategoryHeader>

                                    <SettingsSwitchInput
                                        label={"Suggest Ticket Assets"}
                                        setting={"showTicketAssetButtons"}
                                        title={"Suggests assets to link based on C-#s or tags found in the title & description"}
                                    />
                                    
                                    <SettingsSwitchInput
                                        label={"Suggest Ticket Types"}
                                        setting={"showTicketTypeButtons"}
                                        title={"Suggests ticket types based on keywords in the title & description"}
                                    />
                                    <div style={{marginLeft: 20}}>
                                        <SettingsSwitchInput
                                            label={"Hide Type Suggestions If Already Set"}
                                            setting={"autoHideTicketTypes"}
                                            disabled={!settings.showTicketTypeButtons}
                                            title={"Hides the type suggestions if the ticket already has a type (not 'General')"}
                                        />
                                        <SettingsSwitchInput
                                            label={"Complete Type Recategorization Task"}
                                            setting={"autoCompleteRecategorizationTask"}
                                            disabled={!settings.showTicketTypeButtons}
                                            title={"Marks the ticket's recategorization task as complete when setting a type"}
                                        />
                                    </div>

                                    <SettingsSwitchInput
                                        label={"Suggest Form Types"}
                                        setting={"suggestFormTypes"}
                                        title={"When creating a new ticket, suggests a form type based on common forms"}
                                    />

                                    <SettingsSwitchInput
                                        label={"Show Surplus Buttons"}
                                        setting={"showSurplusButtons"}
                                        title={"Adds buttons to the asset page to quickly mark as surplus or create surplus ticket"}
                                    />

                                    <SettingsSwitchInput
                                        label={"Add a Create Ticket Button to Dashboard"}
                                        setting={"dashboardAddTicketButton"}
                                        title={"Adds a \"Create Service Request\" button to the dashboard"}
                                    />
                                </div>
                            )}

                            <SettingsCategoryHeader>Authentication</SettingsCategoryHeader>
                            <SettingsAuthInput/>
                            <SettingsSwitchInput
                                label={"Auto Update Auth Key"}
                                setting={"autoUpdateAuthKey"}
                                title={"Refreshes the authentication key automatically when it expires"}
                            />

                            <SettingsCategoryHeader>Danger Zone</SettingsCategoryHeader>
                            <div className={"btn-group mt-1 w-100"}>
                                <ExportSettingsButton/>
                                <ImportSettingsButton/>
                                <ResetSettingsButton/>
                            </div>
                            <div className={"btn-group mt-1 w-100"}>
                                <ClearSearchHistoryButton/>
                            </div>

                            {/* ---- END SETTINGS ---- */}

                            <hr style={{marginBottom: 0, marginTop: 10}}/>
                            <p style={{margin: 0, padding: 0, fontSize: 12}}>
                                TDX Wizard made with ❤️ by{" "}
                                <a target={"_blank"} href={"https://digiworm0.github.io/"}>Digi</a>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </ModalBase>
    );
}