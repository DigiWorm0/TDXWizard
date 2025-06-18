import React from "react";

export interface ButtonGroupProps {
    children: React.ReactNode;
}

export default function TDXButtonGroup(props: ButtonGroupProps) {
    return (
        <div
            className={"btn-group"}
            style={{
                gap: 0,
                margin: "0px 3px"
            }}
        >
            {props.children}
        </div>
    )
}