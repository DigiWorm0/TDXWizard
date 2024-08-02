import SettingsSwitchInput from "../input/SettingsSwitchInput";
import ModalBase from "./ModalBase";
import SidebarImage from "../../content/SidebarBG.png";
import {GM_info} from "$";
import SettingsAuthInput from "../input/SettingsAuthInput";
import useSettings from "../../hooks/useSettings";

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
                                width={170}
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
                            <hr style={{marginTop: 6, marginBottom: 10}}/>
                            <SettingsSwitchInput label={"Unlink Emails / Phones"} setting={"unlinkEmails"}/>
                            <SettingsSwitchInput
                                label={"Auto-Close Tickets On Save"}
                                setting={"autoCloseTicketOnSave"}
                            />
                            <SettingsSwitchInput label={"Confirm Actions"} setting={"confirmActions"}/>
                            <SettingsSwitchInput label={"Auto Print on Print View"} setting={"autoPrint"}/>
                            <div style={{marginLeft: 20}}>
                                <SettingsSwitchInput
                                    label={"Close Print View After Print"}
                                    setting={"closePrintViewAfterPrint"}
                                    disabled={!settings.autoPrint}
                                />
                            </div>
                            <SettingsSwitchInput label={"Use New Feed"} setting={"useNewFeed"}/>
                            <div style={{marginLeft: 20}}>
                                <SettingsSwitchInput
                                    label={"Merge Adjacent System Messages"}
                                    setting={"mergeAdjacentSystemMessages"}
                                    disabled={!settings.useNewFeed}
                                />
                            </div>
                            <SettingsSwitchInput label={"Show Surplus Buttons"} setting={"showSurplusButtons"}/>
                            <SettingsSwitchInput label={"Show Assign Buttons"} setting={"showTicketAssignButtons"}/>
                            <div style={{marginLeft: 20}}>
                                <SettingsSwitchInput
                                    label={"Hide Assign Buttons If Open"}
                                    setting={"hideAssignButtonsIfOpen"}
                                    disabled={!settings.showTicketAssignButtons}
                                />
                                <SettingsSwitchInput
                                    label={"Hide Assign Buttons If Assigned"}
                                    setting={"hideAssignButtonsIfAssigned"}
                                    disabled={!settings.showTicketAssignButtons}
                                />
                            </div>
                            <SettingsSwitchInput label={"Show Type Buttons"} setting={"showTicketTypeButtons"}/>

                            <div style={{marginLeft: 20}}>
                                <SettingsSwitchInput
                                    label={"Hide Type Buttons If Already Set"}
                                    setting={"autoHideTicketTypes"}
                                />
                            </div>
                            <SettingsAuthInput/>

                            <p style={{margin: 0, padding: 0, fontSize: 12}}>
                                TDX Wizard made with ❤️ by{" "}
                                <a target={"_blank"} href={"https://digiworm0.github.io/"}>Digi</a>
                                {" "}(GNU GPLv3)
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </ModalBase>
    );
}