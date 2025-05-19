import Settings from "../../types/Settings";
import useSettings from "../../hooks/useSettings";

export interface SettingsSwitchInputProps {
    label: string;
    setting: keyof Settings;
    disabled?: boolean;
    title?: string;
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
        <div
            style={{height: 25}}
        >
            <label
                style={{
                    marginBottom: 0,
                    fontSize: 14,
                }}
                title={props.title}
            >
                <input
                    type="checkbox"
                    className={"me-1"}
                    checked={settings[props.setting] as boolean}
                    onChange={e => setSetting(e.target.checked)}
                    disabled={props.disabled}
                />
                {props.label}
            </label>
        </div>
    )
}