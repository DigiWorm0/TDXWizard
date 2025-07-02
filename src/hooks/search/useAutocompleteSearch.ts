import React from "react";
import LocalTDXClient from "../../tdx-api/LocalTDXClient";
import CustomAttributeComponent from "../../tdx-api/types/CustomAttributeComponent";
import {SearchType} from "../../types/SearchType";
import SearchResult from "../../types/SearchResult";
import toast from "react-hot-toast";

const QUERY_DELAY = 500; // ms

const COMPONENT_ID_TO_TYPE: Partial<Record<CustomAttributeComponent, SearchType>> = {
    [CustomAttributeComponent.Person]: SearchType.Person,
    [CustomAttributeComponent.Asset]: SearchType.Laptop,
    [CustomAttributeComponent.Ticket]: SearchType.Ticket,
}

export default function useAutocompleteSearch(query: string) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [results, setResults] = React.useState<SearchResult[]>([]);

    React.useEffect(() => {
        let isCanceled = false;

        // Don't bettersearch if the query is empty
        if (query.trim() === "")
            return;

        // Wait for a delay before running the bettersearch to avoid too many requests
        setTimeout(() => {
            if (isCanceled) return;

            // Clear previous results
            setResults([]);
            setIsLoading(true);

            // Run the bettersearch query
            const client = new LocalTDXClient();
            client.search.search(`"${query}"`)
                .then((results) => {
                    if (isCanceled) return;

                    // Save the results
                    setResults(results.map((result) => {

                        // Convert TDX SearchResult to Wizard SearchResult
                        const type = COMPONENT_ID_TO_TYPE[result.ComponentID] ?? SearchType.Other;
                        return {
                            text: result.Title,
                            type: type,
                            href: result.DetailUrl
                        };
                    }));
                })
                .catch((error) => {
                    if (isCanceled) return;

                    toast.error(`Error searching for "${query}": ${error.message}`);
                })
                .finally(() => {
                    if (isCanceled) return;

                    setIsLoading(false);
                });
        }, QUERY_DELAY);

        return () => {
            isCanceled = true;
        }
    }, [query]);

    return [results, isLoading] as const;
}