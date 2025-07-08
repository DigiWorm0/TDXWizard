import {GM_info} from "$";

export default function SettingsTitle() {
    return (
        <span
            style={{
                fontFamily: "\"DM Sans\",sans-serif",
                fontWeight: "bold",
                fontSize: 30,
                marginTop: 16
            }}
        >
            TDX Wizard
            <span
                style={{
                    fontWeight: "normal",
                    fontSize: 20,
                    marginLeft: 5,
                }}
            >
                v{GM_info.script.version}
            </span>
        </span>
    );
}