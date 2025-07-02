import {atom, useSetAtom} from "jotai";
import {searchHistoryAtom} from "./useSearchHistory";
import {settingsAtom} from "./useSettings";
import SearchResult from "../types/SearchResult";

const MAX_SEARCH_HISTORY = 8;

export const appendSearchHistoryAtom = atom(null, (get, set, searchResult: SearchResult) => {
    // Don't save anything if bettersearch history is disabled
    const settings = get(settingsAtom);
    if (!settings.enableNewSearchHistory)
        return;

    // Find existing bettersearch result in history
    const searchHistory = get(searchHistoryAtom);
    const existingIndex = searchHistory.findIndex(item => item.href === searchResult.href);

    // If it exists, remove it from the history
    if (existingIndex !== -1)
        searchHistory.splice(existingIndex, 1);

    // Add the bettersearch result to the end of history
    const updatedHistory = [...searchHistory, searchResult].slice(-MAX_SEARCH_HISTORY); // Keep only the last 8 results
    set(searchHistoryAtom, updatedHistory);
});

export default function useAppendSearchHistory() {
    return useSetAtom(appendSearchHistoryAtom);
}