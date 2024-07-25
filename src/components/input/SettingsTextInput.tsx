import Settings from "../../types/Settings";
import getSettings from "../../hooks/settings/getSettings";
import setSetting from "../../hooks/settings/setSettings";
import React from "react";

export interface SettingsTextInputProps {
    label: string;
    setting: keyof Settings;
}

export default function SettingsTextInput(props: SettingsTextInputProps) {
    const [value, setValue] = React.useState(getSettings()[props.setting] as string);

    React.useEffect(() => {
        setSetting(props.setting, value);
    }, [value, props.setting]);

    return (
        <div className="flex flex-col">
            <input
                type="text"
                placeholder={props.label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{width: "100%", marginTop: 5}}
            />
        </div>
    )
}