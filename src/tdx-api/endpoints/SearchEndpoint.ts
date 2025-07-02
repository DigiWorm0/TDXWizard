import TDXEndpoint from "../TDXEndpoint";
import SearchResults from "../types/SearchResults";

const SEARCH_QUERY_URL = "/TDNext/Apps/Shared/Global/Search";

/**
 * A class for interacting with the TDX Search API
 * This is closed-source, so documentation is limited.
 */
export default class SearchEndpoint extends TDXEndpoint {
    async search(searchQuery: string) {

        // Not in the public API yet, so we manually post to the search endpoint
        const res = await fetch(SEARCH_QUERY_URL, {
            method: "POST",
            body: JSON.stringify({
                searchText: searchQuery,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const response = await res.json() as SearchResults;
        return response.Results;
    }
}