import Settings from "../../../types/Settings";
import useSettings from "../../../hooks/useSettings";
import toast from "react-hot-toast";

export interface SettingsSwitchInputProps {
    label: string;
    setting: keyof Settings;
    disabled?: boolean;
    title?: string;

    // Requires refresh to take effect
    requiresRefresh?: boolean;
}

export default function SettingsSwitchInput(props: SettingsSwitchInputProps) {
    const [settings, setSettings] = useSettings();

    const setSetting = (value: boolean) => {
        setSettings({
            ...settings,
            [props.setting]: value
        });

        const isChanged = settings[props.setting] !== value;
        if (props.requiresRefresh && isChanged)
            toast.loading("Please refresh the page to apply this change", {
                duration: 5000,
                icon: <i className={"fa fa-refresh"}></i>,
            });
    }

    return (
        <div style={{height: 25}}>
            <label
                style={{
                    marginBottom: 0,
                    fontSize: 14,
                    color: props.disabled ? "#6c757d" : "inherit",
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