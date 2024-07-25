import React from "react";
import SettingsModal from "../modals/SettingsModal";

export default function SettingsButton() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        // Rainbow animation effect
        const button = buttonRef.current!;
        let hue = 0;
        const interval = setInterval(() => {
            hue = (hue + 15) % 360;
            button.style.color = `hsl(${hue}, 100%, 40%)`;
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <button
                ref={buttonRef}
                type={"button"}
                className={"btn btn-link btn-desktop"}
                title={"TDX Wizard"}
                onClick={() => setIsOpen(true)}
                style={{
                    transition: "all 0.2s",
                    transform: `rotate(${isHovered ? 15 : 0}deg) translateY(${isHovered ? -2 : 0}px)`,
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