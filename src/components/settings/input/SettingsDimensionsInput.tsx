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
            [props.xSetting]: x,
            [props.ySetting]: y,
        });
    }

    return (
        <div
            className={"d-flex flex-row"}
            title={props.title}
        >
            <input
                type="text"
                placeholder={props.label}
                value={settings[props.xSetting] as string}
                onChange={(e) => setValue(e.target.value, settings[props.ySetting] as string)}
                style={{width: 100, height: 25, minHeight: 0, fontSize: 14}}
                disabled={props.disabled}
                className={`${props.disabled ? "text-muted" : ""} form-control`}
            />
            <span style={{margin: "0 5px"}}>x</span>
            <input
                type="text"
                placeholder={props.label}
                value={settings[props.ySetting] as string}
                onChange={(e) => setValue(settings[props.xSetting] as string, e.target.value)}
                style={{width: 100, height: 25, minHeight: 0, fontSize: 14}}
                disabled={props.disabled}
                className={`${props.disabled ? "text-muted" : ""} form-control form-control-sm`}
            />
        </div>
    );
}