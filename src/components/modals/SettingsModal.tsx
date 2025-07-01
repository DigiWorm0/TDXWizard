import SettingsSwitchInput from "../input/SettingsSwitchInput";
import ModalBase from "./ModalBase";
import SidebarImage from "../../content/SidebarBG.png";
import {GM_info} from "$";
import SettingsAuthInput from "../input/SettingsAuthInput";
import useSettings from "../../hooks/useSettings";
import SettingsColorPickerInput from "../input/SettingsColorPickerInput";
import SettingsHeader from "../style/SettingsHeader";
import ResetSettingsButton from "../buttons/ResetSettingsButton";
import ExportSettingsButton from "../buttons/ExportSettingsButton";
import ImportSettingsButton from "../buttons/ImportSettingsButton";
import ClearSearchHistoryButton from "../buttons/ClearSearchHistoryButton";

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
                style={{
                    maxWidth: 620
                }}
            >
                <div className={"modal-content"}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                        }}
                    >
                        <div>
                            <img
                                alt={"Sidebar"}
                                src={SidebarImage}
                                width={230}
                                style={{
                                    borderTopLeftRadius: "1.125rem",
                                    borderBottomLeftRadius: "1.125rem",
                                    height: "100%",
                                    objectFit: "cover",
                                    marginRight: 5,
                                }}
                            />
                            <span
                                aria-hidden={true}
                                className={"fa fa-hat-wizard wizard_float"}
                                style={{
                                    position: "absolute",
                                    top: 115,
                                    left: -25,
                                    fontSize: 220,
                                    filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))",
                                    color: "#fff",
                                }}
                            />
                        </div>
                        <div
                            style={{
                                margin: 10,
                                width: "100%",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "\"DM Sans\",sans-serif",
                                        fontWeight: "bold",
                                        fontSize: 30,
                                        marginTop: 16
                                    }}
                                >
                                    TDX Wizard
                                    <span
                                        style={{
                                            fontWeight: "normal",
                                            fontSize: 20,
                                            marginLeft: 5,
                                        }}
                                    >
                                    v{GM_info.script.version}
                                </span>
                                </span>
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

                            <p
                                style={{
                                    fontSize: 12,
                                    lineHeight: 1.5,
                                    marginTop: 10,
                                }}
                            >
                                Features with
                                <span
                                    aria-hidden={true}
                                    className={"ms-1 me-1 fa fa-house"}
                                    style={{color: "rgb(0, 88, 255)"}}
                                />
                                <span className={"visually-hidden"}>
                                    Proprietary Icon
                                </span>
                                are proprietary to UW-Stout and won't work on other TDX instances.
                            </p>

                            {/* ---- START SETTINGS ---- */}

                            <SettingsHeader title={"Common"}/>

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
                            </div>

                            <SettingsHeader title={"Feed"}/>

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

                            <SettingsHeader title={"Tickets"}/>

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
                                label={"Add a Create Ticket Button to Dashboard"}
                                setting={"dashboardAddTicketButton"}
                                title={"Adds a \"Create Service Request\" button to the dashboard"}
                            />

                            <SettingsSwitchInput
                                label={"Hide Copy URL Button"}
                                setting={"removeCopyURLButton"}
                                title={"Hides the 'Copy URL' button adjacent to the ticket ID"}
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
                                label={"Suggest Ticket Assignments"}
                                setting={"showTicketAssignButtons"}
                                title={"Suggests assignments for tickets based on the feed"}
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
                                label={"Suggest Ticket Types"}
                                setting={"showTicketTypeButtons"}
                                title={"Suggests ticket types based on keywords in the title & description"}
                                proprietary
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
                                proprietary
                                label={"Suggest Form Types"}
                                setting={"suggestFormTypes"}
                                title={"When creating a new ticket, suggests a form type based on common forms"}
                            />

                            <SettingsSwitchInput
                                label={"Suggest Ticket Assets"}
                                setting={"showTicketAssetButtons"}
                                title={"Suggests assets to link based on C-#s or tags found in the title & description"}
                            />

                            <SettingsSwitchInput
                                label={"Enable Custom Templates"}
                                setting={"enableCustomTemplates"}
                                title={"Enables custom templates for ticket updates"}
                            />

                            <SettingsHeader title={"Printing"}/>

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

                            <SettingsHeader title={"Inventory"}/>

                            <SettingsSwitchInput
                                proprietary
                                label={"Show Surplus Buttons"}
                                setting={"showSurplusButtons"}
                                title={"Adds buttons to the asset page to quickly mark as surplus or create surplus tickets"}
                            />
                            <SettingsSwitchInput
                                label={"Add Bulk Inventory Button"}
                                setting={"bulkInventoryButton"}
                                title={"Adds a tool to the inventory desktop to update assets in bulk"}
                            />

                            <SettingsHeader title={"Style"}/>
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
                            {/*<SettingsSwitchInput*/}
                            {/*    label={"Custom Colors"}*/}
                            {/*    setting={"useCustomColorPalette"}*/}
                            {/*    title={"Recolors the TDX interface with a custom color palette"}*/}
                            {/*/>*/}
                            {/*<div style={{marginLeft: 20}}>*/}
                            {/*    <SettingsColorPickerInput*/}
                            {/*        label={"Primary Color"}*/}
                            {/*        setting={"primaryColor"}*/}
                            {/*        disabled={!settings.useCustomColorPalette}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            <SettingsHeader title={"Authentication"}/>
                            <SettingsAuthInput/>
                            <SettingsSwitchInput
                                label={"Auto Update Auth Key"}
                                setting={"autoUpdateAuthKey"}
                                title={"Refreshes the authentication key automatically when it expires"}
                            />

                            <SettingsHeader title={"Danger Zone"}/>
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