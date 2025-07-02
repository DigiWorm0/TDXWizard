import Settings from "../../../types/Settings";
import useSettings from "../../../hooks/useSettings";

export interface SettingsTextInputProps {
    label: string;
    setting: keyof Settings;
    disabled?: boolean;
    showLabel?: boolean;
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
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {props.showLabel &&
                <label style={{marginBottom: 0, marginRight: 5, flexShrink: 0}}>
                    {props.label}
                </label>
            }
            <input
                type="text"
                placeholder={props.label}
                value={settings[props.setting] as string}
                onChange={(e) => setValue(e.target.value)}
                style={{width: "100%", height: 25}}
                disabled={props.disabled}
                className={`${props.disabled ? "text-muted" : ""} form-control form-control-sm`}
            />
        </div>
    )
}