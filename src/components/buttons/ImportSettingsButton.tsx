import useSettings from "../../hooks/useSettings";

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
        <button
            className={"btn btn-secondary btn-sm"}
            type={"button"}
            onClick={importSettings}
            title={"Import all settings from a JSON file"}
        >
            <span className={"fa fa-solid fa-nopad fa-upload me-1"}/>
            <span className={"hidden-xs padding-left-xs"}>
                Import
            </span>
        </button>
    )
}