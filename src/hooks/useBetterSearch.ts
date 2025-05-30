import React from "react";
import runSearch from "../utils/runSearch";
import SearchResult from "../types/SearchResult";

const QUERY_DELAY = 300; // ms

export default function useBetterSearch(query: string) {
    const [results, setResults] = React.useState<SearchResult[]>([]);
    const [isLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);
    const [lastSearch, setLastSearch] = React.useState<string>("");

    React.useEffect(() => {

        // Prevent multiple searches from running at the same time
        if (isLoading)
            return;

        // Prevent duplicate searches
        if (query === lastSearch)
            return;

        // Prevent empty searches
        if (query.trim() === "")
            return;

        const timeout = setTimeout(() => {

            setLoading(true);
            setError(null);
            setResults([]);
            setLastSearch(query);

            runSearch(query)
                .then(setResults)
                .catch(setError)
                .finally(() => setLoading(false));

        }, QUERY_DELAY);

        return () => clearTimeout(timeout);
    }, [query, isLoading]);

    return [results, isLoading, error] as const;
}