import getAuthKeyFromSSO from "../../../utils/getAuthKeyFromSSO";
import React from "react";
import useSettings from "../../../hooks/useSettings";
import LocalTDXClient from "../../../tdx-api/LocalTDXClient";
import HTTPResponseError from "../../../utils/HTTPResponseError";
import toast from "react-hot-toast";

export default function SettingsAuthInput() {
    const [isHovered, setIsHovered] = React.useState(false);
    const [settings, setSettings] = useSettings();

    const setAuthKey = (authKey: string) => {
        setSettings({
            ...settings,
            authKey
        });
    }

    const checkUserInfo = (authKey: string) => {
        const client = new LocalTDXClient(authKey);

        // Run the promise to check user info
        toast.promise(
            client.auth.getUser(),
            {
                loading: "Checking user info...",
                success: (user) => `Logged in as ${user.UserName}`,
                error: (e) => {
                    if (e instanceof HTTPResponseError && e.response.status === 401)
                        return "Invalid Auth Key";
                    return e.message;
                }
            }
        );
    }

    const loginWithSSO = () => {
        getAuthKeyFromSSO().then((authKey) => {
            setAuthKey(authKey);
            checkUserInfo(authKey);
        }).catch(console.error);
    }

    return (
        <>
            <input
                type={isHovered ? "text" : "password"}
                title={"TDX API Auth Token (don't share this with anyone!)"}
                className={"form-control form-control-sm ms-0"}
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
            <div className={"btn-group w-100"}>
                <button
                    className={"btn btn-primary btn-sm"}
                    type={"button"}
                    onClick={loginWithSSO}
                    style={{
                        marginRight: 0
                    }}
                    title={"Generates an authentication key using a single-sign-on (SSO) popup"}
                >
                    <span
                        className={"fa fa-door-open fa-solid fa-nopad me-1"}
                    />
                    <span className={"hidden-xs padding-left-xs"}>
                        Login with SSO
                    </span>
                </button>
                <button
                    className={"btn btn-secondary btn-sm"}
                    type={"button"}
                    onClick={() => checkUserInfo(settings.authKey)}
                    disabled={!settings.authKey}
                    title={"Checks if the current authentication key is valid"}
                >
                    <span className={`fa fa-user fa-solid fa-nopad me-1`}/>
                    <span className={"hidden-xs padding-left-xs"}>
                        Check User Info
                    </span>
                </button>
            </div>
        </>
    )
}