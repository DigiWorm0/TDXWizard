import useAutocompleteSearch from "./useAutocompleteSearch";
import useInitialSearch from "./useInitialSearch";

export default function useBetterSearch(query: string) {
    const [autocompleteResults, isAutocompleteLoading] = useAutocompleteSearch(query);
    const [initialSearch, isInitialSearchLoading] = useInitialSearch(query);

    const results = [...initialSearch, ...autocompleteResults];
    const isLoading = isInitialSearchLoading || isAutocompleteLoading;

    return [results, isLoading] as const;
}