import Settings from "../../types/Settings";
import getSettings from "./getSettings";
import { GM_setValue } from "$";

/**
 * Sets a setting in local storage.
 * @param key - The setting key.
 * @param value - The setting value.
 */
export default function setSetting<T extends keyof Settings>(key: T, value: Settings[T]) {
    const settings = getSettings();
    settings[key] = value;
    GM_setValue("settings", JSON.stringify(settings));
}