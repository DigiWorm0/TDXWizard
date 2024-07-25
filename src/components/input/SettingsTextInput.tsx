import Settings from "../../types/Settings";
import useSettings from "../../hooks/useSettings";

export interface SettingsTextInputProps {
    label: string;
    setting: keyof Settings;
}

export default function SettingsTextInput(props: SettingsTextInputProps) {
    const [settings, setSettings] = useSettings();

    const setValue = (value: string) => {
        setSettings({
            ...settings,
            [props.setting]: value
        });
    }

    return (
        <div className="flex flex-col">
            <input
                type="text"
                placeholder={props.label}
                value={settings[props.setting] as string}
                onChange={(e) => setValue(e.target.value)}
                style={{width: "100%", marginTop: 5}}
            />
        </div>
    )
}