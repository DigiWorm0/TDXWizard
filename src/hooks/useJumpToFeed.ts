import {atom, useAtom} from "jotai";

export const jumpToFeedIDAtom = atom<number | undefined>(undefined);

export default function useJumpToFeedID() {
    return useAtom(jumpToFeedIDAtom);
}