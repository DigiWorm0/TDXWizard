import SearchResults from "../types/SearchResults";
import SearchResult from "../types/SearchResult";

const queryURL = "/TDNext/Apps/Shared/Global/Search";

export default async function runSearch(text: string): Promise<SearchResult[]> {
    // Not in the public API yet, so we manually post to the search endpoint
    const res = await fetch(queryURL, {
        method: "POST",
        body: JSON.stringify({
            searchText: text,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const response = await res.json() as SearchResults;
    return response.Results;
}