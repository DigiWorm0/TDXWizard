const SSO_PATH = "/TDWebApi/api/auth/loginsso";

/**
 * Opens a popup to log in via SSO and retrieves the auth key from the redirected page.
 *
 * This has to be a window popup instead of a hidden iframe to avoid cross-origin or
 * x-frame issues with SSO sign-in pages such as Microsoft Entra ID.
 */
export default async function getAuthKeyFromSSO() {

    // Open the login popup
    const loginPopup = window.open(
        SSO_PATH,
        "Login",
        "width=600,height=400"
    );
    if (!loginPopup)
        throw new Error("Failed to open login popup");

    // Wait for the login popup to redirect to the auth key page
    await new Promise(((resolve, reject) => {
        setInterval(() => {
            try {
                if (loginPopup.closed)
                    reject("Login popup closed");
                if (loginPopup.location.pathname === SSO_PATH)
                    resolve("");
            } catch (e) {
                // Ignore cross-origin errors
            }
        }, 200);
    }));

    // Get the auth key from the login popup
    const authKey = loginPopup.document.body.innerText;

    // Close the login popup
    loginPopup.close();
    return authKey;
}