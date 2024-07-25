export default async function getAPIKeyFromSSO() {
    const loginPopup = window.open(
        "/TDWebApi/api/auth/loginsso",
        "Login",
        "width=600,height=400"
    );

    if (!loginPopup)
        throw new Error("Failed to open login popup");

    await new Promise(((resolve, reject) => {
        setInterval(() => {
            if (loginPopup.location.pathname === "/TDWebApi/api/auth/loginsso")
                resolve("");
            if (loginPopup.closed)
                reject("Login popup closed");
        }, 200);
    }));

    const authKey = loginPopup.document.body.innerText;
    loginPopup.close();
    return authKey;
}