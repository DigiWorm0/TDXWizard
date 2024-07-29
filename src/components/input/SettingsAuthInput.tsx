import getAPIKeyFromSSO from "../../utils/tdx/getAuthKeyFromSSO";
import React from "react";
import useSettings from "../../hooks/useSettings";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import User from "../../tdx-api/types/User";
import HTTPResponseError from "../../utils/HTTPResponseError";

export default function SettingsAuthInput() {
    const [isHovered, setIsHovered] = React.useState(false);
    const [settings, setSettings] = useSettings();
    const [isLoading, setIsLoading] = React.useState(false);
    const [user, setUser] = React.useState<User | undefined>(undefined);
    const [error, setError] = React.useState<string | null>(null);

    const setAuthKey = (authKey: string) => {
        setSettings({
            ...settings,
            authKey
        });
    }

    const loginWithSSO = () => {
        getAPIKeyFromSSO().then(setAuthKey).catch(console.error);
    }

    const getUserInfo = () => {
        const client = new UWStoutTDXClient(settings.authKey);
        setUser(undefined);
        setError(null);
        setIsLoading(true);
        client.auth.getUser()
            .then(setUser)
            .catch(e => {
                console.error(e);
                if (e instanceof HTTPResponseError && e.response.status === 401)
                    setError("Invalid Auth Key");
                else
                    setError(e.message);
            })
            .finally(() => setIsLoading(false));
    }

    React.useEffect(() => {
        setUser(undefined);
    }, [settings.authKey]);

    return (
        <>
            <div style={{height: 10}}/>
            {error && (
                <div className={"alert alert-danger"} role={"alert"} style={{margin: 5, padding: 5}}>
                    <strong>Error:</strong> {error}
                </div>
            )}
            {user && (
                <div className={"alert alert-success"} role={"alert"} style={{margin: 5, padding: 5}}>
                    <strong>Success:</strong> Logged in as {user.UserName}
                </div>
            )}
            <div className={"btn-group"}>
                <button
                    className={"btn btn-primary"}
                    type={"button"}
                    onClick={loginWithSSO}
                    style={{
                        marginRight: 0
                    }}
                >
                    <span
                        className={"fa fa-door-open fa-solid fa-nopad"}
                    />
                    <span className={"hidden-xs padding-left-xs"}>
                        Login with SSO
                    </span>
                </button>
                <button
                    className={"btn btn-default"}
                    type={"button"}
                    onClick={getUserInfo}
                    disabled={!settings.authKey || isLoading}
                    style={{
                        cursor: isLoading ? "wait" : "pointer"
                    }}
                >
                    <span
                        className={"fa fa-user fa-solid fa-nopad"}
                    />
                    <span className={"hidden-xs padding-left-xs"}>
                        Get User Info
                    </span>
                </button>
            </div>
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