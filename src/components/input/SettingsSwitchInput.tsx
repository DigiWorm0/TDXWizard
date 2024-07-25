import Settings from "../../types/Settings";
import getSettings from "../../hooks/settings/getSettings";
import setSetting from "../../hooks/settings/setSettings";
import React from "react";

export interface SettingsSwitchInputProps {
    label: string;
    setting: keyof Settings;
}

export default function SettingsSwitchInput(props: SettingsSwitchInputProps) {
    const [value, setValue] = React.useState(getSettings()[props.setting] as boolean);

    React.useEffect(() => {
        setSetting(props.setting, value);
    }, [value, props.setting]);

    return (
        <div className="flex justify-between items-center">
            <input
                type="checkbox"
                checked={value}
                onChange={() => setValue(!value)}
            />

            <label
                className="ml-2"
                htmlFor={props.label}
            >
                {props.label}
            </label>
        </div>
    )
}