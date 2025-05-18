import React from "react";
import SettingsModal from "../modals/SettingsModal";

export default function SettingsButton() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <>
            <button
                type={"button"}
                className={"tdx-user-icon tdx-user-icon--large tdx-user-icon--nomargin"}
                title={"TDX Wizard"}
                onClick={() => setIsOpen(true)}
                style={{
                    transition: "all 0.2s",
                    transform: `rotate(${isHovered ? 15 : 0}deg) scale(${isHovered ? 1.3 : 1})`,
                    color: isHovered ? "rgb(84, 44, 194)" : "rgb(55, 29, 128)",
                    border: "none"
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span className={"fa fa-hat-wizard"}/>
            </button>
            <SettingsModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}