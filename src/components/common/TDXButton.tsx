import React from "react";
import useSettings from "../../hooks/useSettings";

export interface TDXButtonProps {
    type?: "tdx" | "bootstrap";
    intent?: "primary" | "secondary" | "danger";

    icon?: string;
    text?: string;
    title?: string;

    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

    noMargin?: boolean;
    disabled?: boolean;

    toggleDropdown?: boolean; // For Bootstrap buttons, to toggle dropdowns
}

export default function TDXButton(props: TDXButtonProps) {
    const [isVisible, setIsVisible] = React.useState(false);
    const [settings] = useSettings();
    const intent = props.intent ?? "secondary";
    const type = props.type ?? "bootstrap";
    const dropdownClass = props.toggleDropdown ? "dropdown-toggle" : "";

    React.useEffect(() => {
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    return (
        <button
            type={"button"}
            className={type === "tdx" ?
                // TDX Custom Button
                `tdx-btn tdx-btn--${intent} ${dropdownClass}` :

                // Bootstrap Button
                `btn btn-${intent} btn-sm ${dropdownClass}`}
            onClick={props.onClick}
            style={{
                // Animate in
                transition: settings.enableAnimations ? "opacity 100ms ease-in-out" : "none",
                opacity: isVisible ? 1 : 0,

                // Default margin for all buttons
                margin: props.noMargin ? "0px" : "0px 3px"
            }}
            title={props.title}
            disabled={props.disabled}

            data-toggle={props.toggleDropdown ? "dropdown" : undefined}
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