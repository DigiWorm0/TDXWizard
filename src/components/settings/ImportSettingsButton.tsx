import useSettings from "../../hooks/useSettings";
import TDXButton from "../common/TDXButton";
import toast from "react-hot-toast";

export default function ImportSettingsButton() {
    const [settings, setSettings] = useSettings();

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
            const settingsText = await file.text();
            const parsedSettings = JSON.parse(settingsText);

            // Update Settings
            setSettings({
                ...parsedSettings,
                authKey: settings.authKey || "", // <-- Preserve existing authKey
            });

            // Toast Success
            toast.success("Settings imported successfully!");
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