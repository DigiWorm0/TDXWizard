import {atom, useAtom} from "jotai";

export const selectedTemplateIDAtom = atom<null | number>(null);

export default function useSelectedTemplateID() {
    return useAtom(selectedTemplateIDAtom);
}