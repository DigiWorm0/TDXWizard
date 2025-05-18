import useSettings from "../../hooks/useSettings";
import React from "react";
import DefaultSettings from "../../db/DefaultSettings";

export default function ResetSettingsButton() {
    const [_, setSettings] = useSettings();

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to reset all settings?"))
            return;

        setSettings({
            ...DefaultSettings
        });
    }

    return (
        <button
            className={"btn btn-primary btn-sm"}
            title={"Reset All Settings"}
            onClick={onClick}
            style={{marginRight: 0}}
        >
            <i className={"fa-solid fa-fw fa-nopad fa-undo me-1"}/>
            <span>
                Reset Settings
            </span>
        </button>
    )
}