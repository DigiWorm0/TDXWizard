import React from "react";
import SearchResult from "../../types/SearchResult";
import useRunInitialSearch from "./useRunInitialSearch";
import {SearchType} from "../../types/SearchType";
import handleError from "../../utils/handleError";

export default function useInitialSearch(query: string) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [results, setResults] = React.useState<SearchResult[]>([]);
    const runInitialSearch = useRunInitialSearch();

    React.useEffect(() => {
        let isCanceled = false;

        if (query.trim() === "")
            return;

        // Clear previous results
        setResults([]);
        setIsLoading(true);

        // Create default result to fall back to
        const DEFAULT_RESULT: SearchResult = {
            text: `Search "${query}"`,
            historyText: query,
            type: SearchType.Search,
            href: `/TDNext/Apps/Shared/Global/Search?searchText=${encodeURIComponent(query)}`
        };

        // Run the initial search query
        runInitialSearch(query, DEFAULT_RESULT)
            .then((result) => {
                if (isCanceled)
                    return;
                if (!result)
                    throw new Error("No results found");

                // Save the result
                setResults([result]);
            })
            .catch(e => {
                if (isCanceled)
                    return;

                // Toast the error
                handleError(e, `Error searching for "${query}"`);

                // Set the default result
                setResults([DEFAULT_RESULT]);
            })
            .finally(() => {
                if (isCanceled)
                    return;

                setIsLoading(false);
            });

        return () => {
            isCanceled = true;
        }
    }, [query]);

    return [results, isLoading] as const;
}