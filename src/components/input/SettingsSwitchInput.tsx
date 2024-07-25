import Settings from "../../types/Settings";
import useSettings from "../../hooks/useSettings";

export interface SettingsSwitchInputProps {
    label: string;
    setting: keyof Settings;
}

export default function SettingsSwitchInput(props: SettingsSwitchInputProps) {
    const [settings, setSettings] = useSettings();

    const setSetting = (value: boolean) => {
        setSettings({
            ...settings,
            [props.setting]: value
        });
    }

    return (
        <div className="flex justify-between items-center">
            <label style={{marginBottom: 0}}>
                <input
                    type="checkbox"
                    checked={settings[props.setting] as boolean}
                    onChange={e => setSetting(e.target.checked)}
                />
                {props.label}
            </label>
        </div>
    )
}