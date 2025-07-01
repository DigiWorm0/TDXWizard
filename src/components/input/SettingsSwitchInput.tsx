import Settings from "../../types/Settings";
import useSettings from "../../hooks/useSettings";
import checkIsUWStout from "../../utils/checkIsUWStout";

export interface SettingsSwitchInputProps {
    label: string;
    setting: keyof Settings;
    disabled?: boolean;
    title?: string;

    // UW-Stout specific
    proprietary?: boolean;
}

export default function SettingsSwitchInput(props: SettingsSwitchInputProps) {
    const [settings, setSettings] = useSettings();

    // Check if disabled
    const isUWStout = checkIsUWStout();
    const disabled = props.disabled || (props.proprietary && !isUWStout);

    const setSetting = (value: boolean) => {
        setSettings({
            ...settings,
            [props.setting]: value
        });
    }

    return (
        <div style={{height: 25}}>
            <label
                style={{
                    marginBottom: 0,
                    fontSize: 14,
                    color: disabled ? "#6c757d" : "inherit",
                }}
                title={props.title}
            >
                <input
                    type="checkbox"
                    className={"me-1"}
                    checked={settings[props.setting] as boolean}
                    onChange={e => setSetting(e.target.checked)}
                    disabled={disabled}
                />
                {props.label}
                {props.proprietary && (
                    <>
                        <span
                            aria-hidden={true}
                            className={"ms-1 me-1 fa fa-house"}
                            title={"This is a proprietary feature of the UW-Stout's TDX instance."}
                            style={{color: "rgb(0, 88, 255)"}}
                        />
                        <span className={"visually-hidden"}>
                            Proprietary Icon
                        </span>
                    </>
                )}
            </label>
        </div>
    )
}