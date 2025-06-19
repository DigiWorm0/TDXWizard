import React from "react";
import runSearch from "../utils/runSearch";
import SearchResult from "../types/SearchResult";
import useSettings from "./useSettings";

const QUERY_DELAY = 500; // ms

export default function useBetterSearch(query: string) {
    const [results, setResults] = React.useState<SearchResult[]>([]);
    const [isLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);
    const [settings] = useSettings();

    React.useEffect(() => {

        // Prevent search if disabled
        if (!settings.useNewSearch ||
            !settings.enableNewSearchAutocomplete)
            return;

        // Prevent empty searches
        if (query.trim() === "")
            return;

        let isCanceled = false;

        const timeout = setTimeout(() => {

            setLoading(true);
            setError(null);
            setResults([]);

            runSearch(query)
                .then((results) => {
                    // Only apply results if the query hasn't changed
                    if (isCanceled)
                        return;
                    setResults(results);
                    setLoading(false);
                })
                .catch(setError);

        }, QUERY_DELAY);

        return () => {
            isCanceled = true;
            clearTimeout(timeout);
        }
    }, [query]);

    return [results, isLoading, error] as const;
}