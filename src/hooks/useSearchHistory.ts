import {atomWithStorage} from "jotai/utils";
import {useAtom} from "jotai";
import SearchHistoryItem from "../types/SearchHistoryItem";

export const searchHistoryAtom = atomWithStorage<SearchHistoryItem[]>("wizard_searchhistory", []);

export default function useSearchHistory() {
    return useAtom(searchHistoryAtom);
}