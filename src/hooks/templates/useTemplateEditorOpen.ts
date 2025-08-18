import {atom, useAtom} from "jotai";

export const templateEditorOpenAtom = atom(false);

export default function useTemplateEditorOpen() {
    return useAtom(templateEditorOpenAtom);
}