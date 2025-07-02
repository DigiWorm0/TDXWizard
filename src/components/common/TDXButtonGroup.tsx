import React from "react";

export interface ButtonGroupProps {
    children: React.ReactNode;
    noMargin?: boolean;
}

export default function TDXButtonGroup(props: ButtonGroupProps) {
    return (
        <div
            className={"btn-group"}
            style={{
                gap: 0,
                margin: props.noMargin ? "0px" : "0px 3px"
            }}
        >
            {props.children}
        </div>
    )
}