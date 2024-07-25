import {atom, useAtom} from "jotai";
import Settings from "../types/Settings";
import {GM_getValue, GM_setValue} from "$";
import DefaultSettings from "../db/DefaultSettings";

export const settingsCacheAtom = atom<Settings | null>(null);
export const settingsAtom = atom(
    (get) => {
        const localSettings = JSON.parse(GM_getValue("settings") ?? "{}");
        const settingsCache: Partial<Settings> = get(settingsCacheAtom) ?? {};
        const settings: Settings = {
            ...DefaultSettings,
            ...settingsCache,
            ...localSettings
        };
        return settings;
    },
    (_get, set, settings: Settings) => {
        GM_setValue("settings", JSON.stringify(settings));
        set(settingsCacheAtom, settings);
    }
);

export default function useSettings() {
    return useAtom(settingsAtom);
}