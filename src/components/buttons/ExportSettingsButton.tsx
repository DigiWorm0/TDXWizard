import useSettings from "../../hooks/useSettings";

export default function ExportSettingsButton() {
    const [settings] = useSettings();

    const exportSettings = () => {

        // Remove Sensitive Data
        const cleanSettings = {...settings, authKey: ""};

        // Serialize Settings
        const settingsString = JSON.stringify(cleanSettings, null, 2);
        const settingsBlob = new Blob([settingsString], {type: "application/json"});

        // Download
        const url = URL.createObjectURL(settingsBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "settings.json";
        a.click();

        // Revoke URL
        URL.revokeObjectURL(url);
    }

    return (
        <button
            className={"btn btn-primary btn-sm"}
            type={"button"}
            onClick={exportSettings}
            style={{
                marginRight: 0
            }}
            title={"Export all settings to a JSON file"}
        >
            <span className={"fa fa-solid fa-nopad fa-download me-1"}/>
            <span className={"hidden-xs padding-left-xs"}>
                Export
            </span>
        </button>
    )
}