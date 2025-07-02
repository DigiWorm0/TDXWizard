import SettingsTextInput from "./SettingsTextInput";
import useSettings from "../../../hooks/useSettings";
import Settings from "../../../types/Settings";

export interface SettingsColorPickerInputProps {
    label: string;
    setting: keyof Settings;
    disabled?: boolean;
}

export default function SettingsColorPickerInput(props: SettingsColorPickerInputProps) {
    const [settings, setSettings] = useSettings();

    const onClick = () => {
        if (props.disabled)
            return;

        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = (settings[props.setting] as string) || "#000000";
        colorInput.addEventListener("change", () => {
            setSettings({
                ...settings,
                [props.setting]: colorInput.value,
            });

            colorInput.remove();
        });
        colorInput.click();
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            <div
                style={{
                    backgroundColor: settings[props.setting] as string,
                    borderRadius: 5,
                    minHeight: "100%",
                    width: 50,
                    margin: 5,
                    cursor: props.disabled ? "auto" : "pointer",
                    opacity: props.disabled ? 0.5 : 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff"
                }}
                onClick={onClick}
            >
                <span className={"fa fa-palette fa-sm"} style={{margin: 0}}/>
            </div>
            <SettingsTextInput
                label={props.label}
                setting={props.setting}
                disabled={props.disabled}
            />
        </div>
    )
}
