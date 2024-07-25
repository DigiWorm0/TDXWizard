import SettingsSwitchInput from "../input/SettingsSwitchInput";
import ModalBase from "./ModalBase";
import SidebarImage from "../../content/SidebarBG.png";
import {GM_info} from "$";
import SettingsAuthInput from "../input/SettingsAuthInput";

export interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
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
                                width={150}
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
                                            marginLeft: 10,
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
                            <SettingsSwitchInput label={"Auto-Close Ticket On Save"} setting={"autoCloseTicketOnSave"}/>
                            <SettingsSwitchInput label={"Auto-Hide Ticket Types"} setting={"autoHideTicketTypes"}/>
                            <SettingsSwitchInput label={"Confirm Actions"} setting={"confirmActions"}/>
                            <SettingsSwitchInput label={"Show Surplus Buttons"} setting={"showSurplusButtons"}/>
                            <SettingsSwitchInput label={"Show Assign Buttons"} setting={"showTicketAssignButtons"}/>
                            <SettingsSwitchInput label={"Show Type Buttons"} setting={"showTicketTypeButtons"}/>
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