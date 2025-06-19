import CustomAttributeComponent from "../tdx-api/types/CustomAttributeComponent";

interface SearchResult {
    AppId: number;
    DetailUrl: string;
    Title: string;
    ComponentID: CustomAttributeComponent;
}

export default SearchResult;