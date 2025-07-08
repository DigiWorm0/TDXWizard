import getSettings, {setSettings} from "./getSettings";
import getAuthKeyFromSSO from "./getAuthKeyFromSSO";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import HTTPResponseError from "./HTTPResponseError";
import dateToDateTime from "./datetime/dateToDateTime";

const EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours

/**
 * Checks if the auth key is valid and updates it if necessary.
 * Ran automatically on page load if the setting is enabled.
 */
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
    const authKeyExpiration = dateToDateTime(new Date(Date.now() + EXPIRATION_TIME));

    // Update the auth key in the settings.
    setSettings({
        ...settings,
        authKeyExpiration,
        authKey
    });

    // Reload the page to apply the new settings.
    // There are a lot of React root nodes that need to be re-rendered when the auth key changes.
    window.location.reload();
}