import React from "react";
import useRunPromise from "../useRunPromise";
import runInitialSearch from "../../utils/runInitialSearch";
import SearchResult from "../../types/SearchResult";
import useSettings from "../useSettings";

export default function useInitialSearch(query: string) {
    const [runPromise, isLoading] = useRunPromise();
    const [results, setResults] = React.useState<SearchResult[]>([]);
    const [settings] = useSettings();

    const {enableNewSearchAutoDetectQuery} = settings;

    React.useEffect(() => {
        let isCanceled = false;

        if (query.trim() === "")
            return;

        // Clear previous results
        setResults([]);

        // Run the initial search query
        runPromise(runInitialSearch(query, enableNewSearchAutoDetectQuery))
            .then((result) => {
                if (isCanceled)
                    return;
                if (!result)
                    throw new Error("No results found");

                // Save the result
                setResults([result]);
            });

        return () => {
            isCanceled = true;
        }
    }, [query, runPromise]);

    return [results, isLoading] as const;
}