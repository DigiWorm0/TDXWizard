import getSettings, {setSettings} from "./getSettings";
import getAuthKeyFromSSO from "./getAuthKeyFromSSO";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import HTTPResponseError from "./HTTPResponseError";

export default async function autoUpdateAuthKey() {

    // Check if we should auto-update the auth key.
    const settings = getSettings();
    if (!settings.autoUpdateAuthKey)
        return;

    // Check if the auth key is valid.
    try {
        const client = new LocalTDXClient();
        await client.auth.getUser();

        // The auth key is up-to-date.
        return;
    } catch (e) {
        // Check if this was HTTP 401 Unauthorized.
        if (!(e instanceof HTTPResponseError))
            throw e;
        if (e.response.status !== 401)
            throw e;

        // The auth key is invalid, continue to update it.
    }

    // Get the new auth key from SSO.
    const authKey = await getAuthKeyFromSSO();

    // Update the auth key in the settings.
    setSettings({
        ...settings,
        authKey
    });

    // Reload the page to apply the new settings.
    // There are a lot of React root nodes that need to be re-rendered when the auth key changes.
    window.location.reload();
}