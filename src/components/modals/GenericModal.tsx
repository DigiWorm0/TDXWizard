import React from "react";
import ModalBase from "./ModalBase";

export interface GenericModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode;
}

export default function GenericModal(props: GenericModalProps) {

    return (
        <ModalBase isOpen={props.isOpen} onClose={props.onClose}>
            <div className={"modal-dialog"} role={"document"}>
                <div className={"modal-content"}>
                    <div
                        style={{cursor: "auto"}} /* <-- TDX overrides this by default */
                        className={"modal-header"}
                    >
                        <button
                            type={"button"}
                            className={"close"}
                            data-dismiss={"modal"}
                            aria-label={"Close"}
                            onClick={props.onClose}
                        >
                            <span aria-hidden={"true"}>&times;</span>
                        </button>
                        <h4 className={"modal-title"}>{props.title}</h4>
                    </div>
                    <div className={"modal-body"}>
                        {props.children}
                    </div>
                </div>
            </div>
        </ModalBase>
    );
}