import {atom, useAtom} from "jotai";
import Settings from "../types/Settings";
import {GM_getValue, GM_setValue} from "$";
import DefaultSettings from "../db/DefaultSettings";
import migrateDeprecatedSettings from "../utils/migrateDeprecatedSettings";

export const settingsCacheAtom = atom<Settings | null>(null);
export const settingsAtom = atom(
    (get) => {
        const localSettings = JSON.parse(GM_getValue("settings") ?? "{}");
        const settingsCache: Partial<Settings> = get(settingsCacheAtom) ?? {};
        
        return migrateDeprecatedSettings({
            ...DefaultSettings,
            ...settingsCache,
            ...localSettings
        });
    },
    (_get, set, settings: Settings) => {
        GM_setValue("settings", JSON.stringify(settings));
        set(settingsCacheAtom, settings);
    }
);

export default function useSettings() {
    return useAtom(settingsAtom);
}