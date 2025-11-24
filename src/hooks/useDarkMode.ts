import {atom, useAtomValue} from "jotai";
import getDarkMode from "../utils/getDarkMode";

export const darkModeAtom = atom(() => {
    return getDarkMode();
});

export default function useDarkMode() {
    return useAtomValue(darkModeAtom);
}