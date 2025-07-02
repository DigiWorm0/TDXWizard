import React from "react";
import SearchResult from "../../types/SearchResult";
import useRunInitialSearch from "./useRunInitialSearch";
import toast from "react-hot-toast";

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

        // Run the initial search query
        runInitialSearch(query)
            .then((result) => {
                if (isCanceled)
                    return;
                if (!result)
                    throw new Error("No results found");

                // Save the result
                setResults([result]);
            })
            .catch((error) => {
                if (isCanceled)
                    return;

                toast.error(`Error searching for "${query}": ${error.message}`);
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