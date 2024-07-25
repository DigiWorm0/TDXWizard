import getAPIKeyFromSSO from "../../utils/getAuthKeyFromSSO";
import setSetting from "../../hooks/settings/setSettings";
import React from "react";
import getSettings from "../../hooks/settings/getSettings";

export default function SettingsAuthInput() {
    const [key, setKey] = React.useState(getSettings().authKey);

    const onClick = () => {
        getAPIKeyFromSSO().then(key => {
            setKey(key);
        }).catch(console.error);
    }

    React.useEffect(() => {
        setSetting("authKey", key);
    }, [key]);

    return (
        <>
            <button
                className={"btn btn-primary"}
                type={"button"}
                onClick={onClick}
            >
                Get Auth Key from SSO
            </button>
            <input
                type="text"
                placeholder={"Auth Key"}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                style={{width: "100%", marginTop: 5}}
            />
        </>
    )
}