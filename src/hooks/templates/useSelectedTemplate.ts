import {atom, useAtom} from "jotai";
import {settingsAtom} from "../useSettings";
import {selectedTemplateIDAtom} from "./useSelectedTemplateID";
import CustomTemplate from "../../types/CustomTemplate";

export const selectedTemplateAtom = atom((get) => {
    const settings = get(settingsAtom);
    const selectedTemplateID = get(selectedTemplateIDAtom);
    return settings.customTemplates.find(t => t.id === selectedTemplateID) || null;
}, (get, set, newTemplate: CustomTemplate) => {
    const settings = get(settingsAtom);
    const selectedTemplateID = get(selectedTemplateIDAtom);

    set(settingsAtom, {
        ...settings,
        customTemplates: settings.customTemplates.map(t =>
            t.id === selectedTemplateID ? {...t, ...newTemplate} : t
        )
    });
});

export default function useSelectedTemplate() {
    return useAtom(selectedTemplateAtom);
}