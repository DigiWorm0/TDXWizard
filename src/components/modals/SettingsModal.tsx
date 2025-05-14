import SettingsSwitchInput from "../input/SettingsSwitchInput";
import ModalBase from "./ModalBase";
import SidebarImage from "../../content/SidebarBG.png";
import {GM_info} from "$";
import SettingsAuthInput from "../input/SettingsAuthInput";
import useSettings from "../../hooks/useSettings";
import ResetCustomTemplatesButton from "../buttons/ResetCustomTemplatesButton";
import ResetSettingsButton from "../buttons/ResetSettingsButton";
import SettingsColorPickerInput from "../input/SettingsColorPickerInput";
import SettingsHeader from "../style/SettingsHeader";
import SettingsTextInput from "../input/SettingsTextInput";
import ExportSettingsButton from "../buttons/ExportSettingsButton";
import ImportSettingsButton from "../buttons/ImportSettingsButton";

export interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
    const [settings] = useSettings();
    return (
        <ModalBase isOpen={props.isOpen} onClose={props.onClose}>
            <div className={"modal-dialog"} role={"document"}>
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
                                width={220}
                                style={{
                                    borderTopLeftRadius: 5,
                                    borderBottomLeftRadius: 5,
                                    height: "100%",
                                    objectFit: "cover",
                                    marginRight: 5,
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
                                <h1 style={{fontWeight: "bold"}}>
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
                                </h1>
                                <button
                                    type={"button"}
                                    className={"close"}
                                    data-dismiss={"modal"}
                                    aria-label={"Close"}
                                    onClick={props.onClose}
                                    style={{marginRight: 10}}
                                >
                                    <span aria-hidden={"true"}>&times;</span>
                                </button>
                            </div>
                            <hr style={{marginTop: 6, marginBottom: 0}}/>

                            {/* ---- START SETTINGS ---- */}

                            <div className={"btn-group"}>
                                <ResetSettingsButton/>
                                <ResetCustomTemplatesButton/>
                            </div>
                            <div className={"btn-group"}>
                                <ExportSettingsButton/>
                                <ImportSettingsButton/>
                            </div>

                            <SettingsHeader title={"Common"}/>

                            <SettingsTextInput
                                label={"Technician Initials"}
                                setting={"technicianInitials"}
                                showLabel
                            />
                            <SettingsSwitchInput
                                label={"Remove Email Anchors/Links"}
                                setting={"unlinkEmails"}
                                title={"Removes all email links for easier username highlight/copy/paste"}
                            />
                            <SettingsSwitchInput
                                label={"Add Self-Assignment Button"}
                                setting={"selectSelfButton"}
                                title={"Adds a button to all user form fields to select yourself"}
                            />
                            <SettingsSwitchInput
                                label={"Add Legacy Lookup Button"}
                                setting={"legacyLookupButton"}
                                title={"Adds a button to each user card to lookup in the legacy system"}
                            />
                            <SettingsSwitchInput
                                label={"Confirm Actions"}
                                setting={"confirmActions"}
                                title={"Adds a confirmation dialog for destructive actions"}
                            />

                            <SettingsHeader title={"Tickets"}/>

                            <SettingsSwitchInput
                                label={"Better Feed"}
                                setting={"useNewFeed"}
                                title={"Replaces the TDX feed with a re-designed version (chronological order, minimize system messages, reply captions/links, etc)"}
                            />
                            <div style={{marginLeft: 20}}>
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
                                    label={"Custom Profile Color"}
                                    setting={"useCustomProfileColor"}
                                    disabled={!settings.useNewFeed}
                                    title={"Uses a custom color for your profile in the feed"}
                                />
                                <div style={{marginLeft: 20}}>
                                    <SettingsColorPickerInput
                                        label={"Custom Profile Color"}
                                        setting={"customProfileColor"}
                                        disabled={!settings.useCustomProfileColor || !settings.useNewFeed}
                                    />
                                </div>
                            </div>

                            <SettingsSwitchInput
                                label={"Automatically Exit Tickets On Action"}
                                setting={"autoCloseTicketOnSave"}
                                title={"Automatically exits the ticket window after completing an action. Useful for bulk actions"}
                            />

                            <SettingsSwitchInput
                                label={"Show Print Button"}
                                setting={"showTicketPrintButton"}
                                title={"Replaces the 'Print View' with a normal 'Print' button"}
                            />
                            <div style={{marginLeft: 20}}>
                                <SettingsSwitchInput
                                    label={"Hide Print View Button"}
                                    setting={"hideTicketPrintViewButton"}
                                    disabled={!settings.showTicketPrintButton}
                                    title={"Hides the default 'Print View' button on the ticket page"}
                                />
                            </div>

                            <SettingsSwitchInput
                                label={"Hide Copy URL Button"}
                                setting={"removeCopyURLButton"}
                                title={"Hides the 'Copy URL' button adjacent to the ticket ID"}
                            />

                            <SettingsSwitchInput
                                label={"Show eStout Ready for Pickup Button"}
                                setting={"eStoutPickupButton"}
                                title={"Enables the eStout 'Ready for Pickup' button on the ticket page"}
                            />

                            <SettingsSwitchInput
                                label={"Show eStout Picked Up Button"}
                                setting={"eStoutResolveButton"}
                                title={"Enables the eStout 'Picked Up' button on the ticket page"}
                            />

                            <SettingsSwitchInput
                                label={"Show Resolve Button"}
                                setting={"resolveButton"}
                                title={"Enables a universal 'Resolve' button on all ticket pages"}
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
                            />
                            <div style={{marginLeft: 20}}>
                                <SettingsSwitchInput
                                    label={"Hide Type Suggestions If Already Set"}
                                    setting={"autoHideTicketTypes"}
                                    disabled={!settings.showTicketTypeButtons}
                                    title={"Hides the type suggestions if the ticket already has a type (not 'General')"}
                                />
                            </div>

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

                            <SettingsHeader title={"Inventory"}/>

                            <SettingsSwitchInput
                                label={"Show Surplus Buttons"}
                                setting={"showSurplusButtons"}
                                title={"Adds buttons to the asset page to quickly mark as surplus or create surplus tickets"}
                            />
                            <SettingsSwitchInput
                                label={"Add Bulk Inventory Button"}
                                setting={"bulkInventoryButton"}
                                title={"Adds a tool to the inventory desktop to update assets in bulk"}
                            />

                            <SettingsHeader title={"Authentication"}/>
                            <SettingsAuthInput/>
                            <SettingsSwitchInput
                                label={"Auto Update Auth Key"}
                                setting={"autoUpdateAuthKey"}
                                title={"Refreshes the authentication key automatically when it expires"}
                            />

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