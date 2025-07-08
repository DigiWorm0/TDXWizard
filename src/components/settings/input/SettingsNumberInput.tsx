import Settings from "../../../types/Settings";
import useSettings from "../../../hooks/useSettings";

export interface SettingsNumberInputProps {
    label: string;
    title?: string;
    setting: keyof Settings;
    disabled?: boolean;
}

export default function SettingsNumberInput(props: SettingsNumberInputProps) {
    const [settings, setSettings] = useSettings();

    const setValue = (value: string) => {
        setSettings({
            ...settings,
            [props.setting]: parseInt(value) || 0
        });
    }

    return (
        <div
            title={props.title}
            className={`d-flex flex-row ${props.disabled ? "text-muted" : ""}`}
            style={{fontSize: 14}}
        >
            <label style={{marginBottom: 0, marginRight: 5, flexShrink: 0}}>
                {props.label}
            </label>
            <input
                type="number"
                placeholder={props.label}
                value={settings[props.setting] as string}
                onChange={(e) => setValue(e.target.value)}
                style={{width: 100, height: 25, minHeight: 0, fontSize: 14}}
                disabled={props.disabled}
                className={"form-control"}
            />
        </div>
    )
}