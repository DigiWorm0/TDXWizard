import Settings from "../../../types/Settings";
import useSettings from "../../../hooks/useSettings";
import toast from "react-hot-toast";

export interface SettingsDropdownInputProps {
    label?: string;
    title?: string;
    setting: keyof Settings;
    disabled?: boolean;

    options: {
        value: string,
        label: string
    }[];

    requiresRefresh?: boolean;
}

export default function SettingsDropdownInput(props: SettingsDropdownInputProps) {
    const [settings, setSettings] = useSettings();

    const setValue = (value: string) => {
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

    const currentValue = settings[props.setting] as string;
    const currentValueText = props.options.find(option => option.value === currentValue)?.label || currentValue;

    return (
        <div
            title={props.title}
            className={`d-flex flex-row ${props.disabled ? "text-muted" : ""}`}
            style={{fontSize: 14}}
        >
            <label style={{marginBottom: 0, marginRight: 5, flexShrink: 0}}>
                {props.label}
            </label>

            <div className={"dropdown"}>
                <button
                    className={"btn btn-primary btn-sm dropdown-toggle"}
                    role={"button"}
                    data-bs-toggle={"dropdown"}
                    disabled={props.disabled}
                    style={{padding: ".05rem .4rem"}}
                >
                    {currentValueText}
                </button>

                <ul className={"dropdown-menu"}>
                    {props.options.map(option => (
                        <li key={option.value}>
                            <a
                                className={"dropdown-item"}
                                href={"#"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setValue(option.value);
                                }}
                            >
                                {option.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}