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
            className={"btn btn-default"}
            type={"button"}
            onClick={exportSettings}
            style={{
                marginRight: 0
            }}
        >
            <span className={"fa fa-solid fa-nopad fa-download"}/>
            <span className={"hidden-xs padding-left-xs"}>
                    Export Settings
                </span>
        </button>
    )
}