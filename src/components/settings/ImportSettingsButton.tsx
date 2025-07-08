import useSettings from "../../hooks/useSettings";
import TDXButton from "../common/TDXButton";

export default function ImportSettingsButton() {
    const [, setSettings] = useSettings();

    const importSettings = () => {
        // Create Input
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.onchange = async () => {
            if (!input.files || input.files.length === 0)
                return;

            // Read File
            const file = input.files[0];
            const settings = await file.text();
            const parsedSettings = JSON.parse(settings);

            // Update Settings
            setSettings(parsedSettings);
        }

        // Click
        input.click();
    }

    return (
        <TDXButton
            icon={"fa fa-solid fa-nopad fa-upload me-1"}
            text={"Import"}
            onClick={importSettings}
            title={"Import all settings from a JSON file"}
            noMargin
        />
    )
}