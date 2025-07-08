import Settings from "../../../types/Settings";
import useSettings from "../../../hooks/useSettings";

export interface SettingsDimensionsInputProps {
    label: string;
    title?: string;
    xSetting: keyof Settings;
    ySetting: keyof Settings;
    disabled?: boolean;
}

export default function SettingsDimensionsInput(props: SettingsDimensionsInputProps) {
    const [settings, setSettings] = useSettings();


    const setValue = (x: string, y: string) => {
        setSettings({
            ...settings,
            [props.xSetting]: parseInt(x) || 0,
            [props.ySetting]: parseInt(y) || 0,
        });
    }

    return (
        <div
            className={`d-flex flex-row ${props.disabled ? "text-muted" : ""}`}
            title={props.title}
            style={{fontSize: 14}}
        >
            <label style={{marginBottom: 0, marginRight: 5, flexShrink: 0}}>
                {props.label}
            </label>
            <input
                type="number"
                placeholder={"width"}
                value={settings[props.xSetting] as string}
                onChange={(e) => setValue(e.target.value, settings[props.ySetting] as string)}
                style={{width: 90, height: 25, minHeight: 0, fontSize: 14}}
                disabled={props.disabled}
                className={"form-control"}
            />
            <span style={{margin: "0 5px"}}>x</span>
            <input
                type="number"
                placeholder={"height"}
                value={settings[props.ySetting] as string}
                onChange={(e) => setValue(settings[props.xSetting] as string, e.target.value)}
                style={{width: 90, height: 25, minHeight: 0, fontSize: 14}}
                disabled={props.disabled}
                className={"form-control"}
            />
        </div>
    );
}