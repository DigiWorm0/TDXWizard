const LOGIN_URL = "/TDWebApi/api/auth/loginsso";

export default async function getAuthKeyFromSSO() {

    // Add iframe to the body to allow the popup to redirect
    const iframe = document.createElement("iframe");
    iframe.style.display = "none"; // Hide the iframe
    iframe.src = "/TDWebApi/api/auth/loginsso";
    document.body.appendChild(iframe);

    //Wait for the iframe to load
    await new Promise((resolve) => {
        iframe.onload = () => resolve("");
    });

    // Check if the iframe redirected away from the login URL
    if (iframe.contentWindow?.location.pathname !== LOGIN_URL) {
        // If it did, remove the iframe and open a popup instead
        document.body.removeChild(iframe);

        // TODO: Open a popup for SSO login
        throw new Error("SSO login is not supported in this environment. Please log in manually.");
    }

    // Get the auth key from the iframe's content
    const authKey = iframe.contentDocument?.body.innerText;
    if (!authKey)
        throw new Error("Failed to retrieve auth key from SSO.");

    // Clean up the iframe
    document.body.removeChild(iframe);

    // Return the auth key
    return authKey;
}