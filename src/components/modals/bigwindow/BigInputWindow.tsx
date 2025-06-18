import NewWindow from "react-new-window";
import React from "react";

export interface BigInputWindowProps {
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

export default function BigInputWindow(props: BigInputWindowProps) {
    return (
        <NewWindow
            title={props.title || "Big Input Window"}
            onUnload={props.onClose}
            features={{width: 900, height: 600}}
            onOpen={(e) => {
                e.window.document.body.classList.add("wizard_window");
            }}
        >
            <div style={{padding: 15}}>
                {props.children}
            </div>
        </NewWindow>
    )
}
