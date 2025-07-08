import useSettings from "../../hooks/useSettings";
import React from "react";
import DefaultSettings from "../../db/DefaultSettings";
import TDXButton from "../common/TDXButton";

export default function ResetSettingsButton() {
    const [_, setSettings] = useSettings();

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to reset all settings? This will delete both settings and templates."))
            return;

        setSettings({
            ...DefaultSettings
        });
    }

    return (
        <TDXButton
            intent={"danger"}
            icon={"fa fa-solid fa-undo me-1"}
            text={"Reset"}
            title={"Reset all settings to default"}
            onClick={onClick}
            noMargin
        />
    )
}