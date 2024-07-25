import getAPIKeyFromSSO from "../../utils/tdx/getAuthKeyFromSSO";
import setSetting from "../../hooks/settings/setSettings";
import React from "react";
import getSettings from "../../hooks/settings/getSettings";

export default function SettingsAuthInput() {
    const [isHovered, setIsHovered] = React.useState(false);
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
                <span
                    className={"fa fa-door-open fa-solid fa-nopad"}
                />
                <span className={"hidden-xs padding-left-xs"}>
                    Login with SSO
                </span>
            </button>
            <input
                type={isHovered ? "text" : "password"}
                placeholder={"Auth Key"}
                value={key}
                onChange={(e) => setKey(e.target.value)}
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