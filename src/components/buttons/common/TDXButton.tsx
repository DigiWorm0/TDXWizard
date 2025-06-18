import React from "react";

export interface TDXButtonProps {
    type?: "tdx" | "bootstrap";
    intent?: "primary" | "secondary" | "danger";

    icon?: string;
    text?: string;
    title?: string;

    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

    noMargin?: boolean;
    disabled?: boolean;
}

export default function TDXButton(props: TDXButtonProps) {
    const intent = props.intent ?? "secondary";
    const type = props.type ?? "bootstrap";

    return (
        <button
            type={"button"}
            className={type === "tdx" ?
                // TDX Custom Button
                `tdx-btn tdx-btn--${intent}` :

                // Bootstrap Button
                `btn btn-${intent} btn-sm`}
            onClick={props.onClick}
            style={{
                // Default margin for all buttons
                margin: props.noMargin ? "0px" : "0px 3px"
            }}
            disabled={props.disabled}
        >
            {/* Button Icon */}
            {props.icon && (<span className={props.icon}/>)}

            {/* Button Text */}
            {props.text && (
                <span className={"hidden-xs padding-left-xs"}>
                    {props.text}
                </span>
            )}
        </button>
    );
}