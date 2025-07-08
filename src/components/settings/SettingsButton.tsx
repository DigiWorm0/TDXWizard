import React from "react";
import SettingsModal from "./SettingsModal";

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
                    border: "none",
                    boxShadow: isHovered ? "0 0 5px rgba(0, 0, 0, 0.5)" : "0 0 0px rgba(0, 0, 0, 0.5)",
                    zIndex: 1000,
                    position: "relative"
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