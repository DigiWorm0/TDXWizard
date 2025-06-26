import React from "react";
import useRunPromise from "../useRunPromise";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import CustomAttributeComponent from "../../tdx-api/types/CustomAttributeComponent";
import {SearchType} from "../../types/SearchType";
import SearchResult from "../../types/SearchResult";

const QUERY_DELAY = 500; // ms

const COMPONENT_ID_TO_TYPE: Partial<Record<CustomAttributeComponent, SearchType>> = {
    [CustomAttributeComponent.Person]: SearchType.Person,
    [CustomAttributeComponent.Asset]: SearchType.Laptop,
    [CustomAttributeComponent.Ticket]: SearchType.Ticket,
}

export default function useAutocompleteSearch(query: string) {
    const [runPromise, isLoading] = useRunPromise();
    const [results, setResults] = React.useState<SearchResult[]>([]);

    React.useEffect(() => {
        let isCanceled = false;

        // Don't search if the query is empty
        if (query.trim() === "")
            return;

        // Wait for a delay before running the search to avoid too many requests
        setTimeout(() => {
            if (isCanceled)
                return;

            // Clear previous results
            setResults([]);

            // Run the search query
            const client = new UWStoutTDXClient();
            runPromise(client.search.search(query).then((results) => {
                if (isCanceled)
                    return;

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
            }));
        }, QUERY_DELAY);

        return () => {
            isCanceled = true;
        }
    }, [query, runPromise]);

    return [results, isLoading] as const;
}