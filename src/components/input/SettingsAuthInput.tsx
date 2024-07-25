import getAPIKeyFromSSO from "../../utils/tdx/getAuthKeyFromSSO";
import React from "react";
import useSettings from "../../hooks/useSettings";

export default function SettingsAuthInput() {
    const [isHovered, setIsHovered] = React.useState(false);
    const [settings, setSettings] = useSettings();

    const setAuthKey = (authKey: string) => {
        setSettings({
            ...settings,
            authKey
        });
    }

    const onClick = () => {
        getAPIKeyFromSSO().then(setAuthKey).catch(console.error);
    }

    return (
        <>
            <button
                className={"btn btn-primary"}
                type={"button"}
                onClick={onClick}
            >
                <span
                    className={"fa fa-door-open fa-solid fa-nopad"}
                />
                <span className={"hidden-xs padding-left-xs"}>
                    Login with SSO
                </span>
            </button>
            <input
                type={isHovered ? "text" : "password"}
                title={"TDX API Auth Token (don't share this with anyone!)"}
                placeholder={"Click the 'Login with SSO' button to get your API Key"}
                value={settings.authKey}
                onChange={e => setAuthKey(e.target.value)}
                style={{
                    width: "100%",
                    margin: "1px 3px",
                    height: 25
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
        </>
    )
}