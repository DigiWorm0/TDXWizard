import Settings from "../types/Settings";
import {GM_getValue, GM_setValue} from "$";
import DefaultSettings from "../db/DefaultSettings";

let _settingsCache: Settings | null = null;

/**
 * Gets the settings from local storage, falling back to the default settings if they don't exist.
 * @returns The settings object.
 */
export default function getSettings(): Settings {
    if (!_settingsCache) {

        // Load settings from storage
        const localSettingsJSON: string = GM_getValue("settings") ?? "{}";
        const localSettings: Partial<Settings> = JSON.parse(localSettingsJSON);
        _settingsCache = {
            ...DefaultSettings,
            ...localSettings
        };
    }

    return _settingsCache;
}

/**
 * Sets the settings in local storage.
 * @param settings - The settings object to set.
 */
export function setSettings(settings: Settings) {
    _settingsCache = settings;
    GM_setValue("settings", JSON.stringify(settings));
}