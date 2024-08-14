export default async function getAuthKeyFromSSO() {

    // Open the login popup
    const loginPopup = window.open(
        "/TDWebApi/api/auth/loginsso",
        "Login",
        "width=600,height=400"
    );
    if (!loginPopup)
        throw new Error("Failed to open login popup");

    // Wait for the login popup to redirect to the auth key page
    await new Promise(((resolve, reject) => {
        setInterval(() => {
            if (loginPopup.location.pathname === "/TDWebApi/api/auth/loginsso")
                resolve("");
            if (loginPopup.closed)
                reject("Login popup closed");
        }, 200);
    }));

    // Get the auth key from the login popup
    const authKey = loginPopup.document.body.innerText;

    // Close the login popup
    loginPopup.close();
    return authKey;
}