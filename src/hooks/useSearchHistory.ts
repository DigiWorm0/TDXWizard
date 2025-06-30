import {atomWithStorage} from "jotai/utils";
import {useAtom} from "jotai";
import SearchResult from "../types/SearchResult";

export const searchHistoryAtom = atomWithStorage<SearchResult[]>("wizard_searchhistory", []);

export default function useSearchHistory() {
    return useAtom(searchHistoryAtom);
}