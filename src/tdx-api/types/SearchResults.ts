import SearchResult from "./SearchResult";

export default interface SearchResults {
    CurrentPage: number;
    HasMoreResults: boolean;
    Results: SearchResult[];
}