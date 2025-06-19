import CustomAttributeComponent from "../../tdx-api/types/CustomAttributeComponent";
import SearchResult from "../../types/SearchResult";
import BetterSearchResult from "./BetterSearchResult";
import {DropdownDivider} from "react-bootstrap";
import useSettings from "../../hooks/useSettings";

export interface BetterSearchAutocompleteProps {
    results: SearchResult[];
    isLoading?: boolean;
    resultsIndex: number;
    setResultsIndex: (index: number) => void;
}

const TYPE_TO_ICON: Record<CustomAttributeComponent, string> = {
    [CustomAttributeComponent.Project]: "fa-diagram-project", // Project
    [CustomAttributeComponent.Issue]: "fa-bug", // Issue
    [CustomAttributeComponent.FileCabinetFile]: "fa-file", // File
    [CustomAttributeComponent.Ticket]: "fa-ticket", // Ticket
    [CustomAttributeComponent.Account]: "fa-user", // Account
    [CustomAttributeComponent.Task]: "fa-tasks", // Task
    [CustomAttributeComponent.KnowledgeBaseArticle]: "fa-book", // Knowledge Base Article
    [CustomAttributeComponent.Asset]: "fa-laptop", // Asset
    [CustomAttributeComponent.Vendor]: "fa-building", // Vendor
    [CustomAttributeComponent.Contract]: "fa-file-contract", // Contract
    [CustomAttributeComponent.ProductModel]: "fa-box", // Product Model
    [CustomAttributeComponent.Person]: "fa-user", // Person
    [CustomAttributeComponent.Service]: "fa-cogs", // Service
    [CustomAttributeComponent.Risk]: "fa-exclamation-triangle", // Risk
    [CustomAttributeComponent.ConfigurationItem]: "fa-cog", // Configuration Item
    [CustomAttributeComponent.Location]: "fa-map-marker-alt", // Location
    [CustomAttributeComponent.LocationRoom]: "fa-door-open", // Location Room
    [CustomAttributeComponent.ServiceOffering]: "fa-concierge-bell", // Service Offering
};

export default function BetterSearchAutocomplete(props: BetterSearchAutocompleteProps) {
    const [settings] = useSettings();
    const {results, isLoading} = props;

    const searchTypeToColor = (type: CustomAttributeComponent) => {
        if (type === CustomAttributeComponent.Asset)
            return "#007bff"; // blue for Asset
        if (type === CustomAttributeComponent.Ticket)
            return "#fd7e14"; // orange for Ticket
        if (type === CustomAttributeComponent.Person)
            return "#28a745"; // green for Person

        return "#6c757d"; // grey for other types
    }

    if (!settings.enableNewSearchAutocomplete)
        return null;
    return (
        <>
            <DropdownDivider/>

            {results.map((result, index) => (
                <BetterSearchResult
                    key={index}
                    href={result.DetailUrl}
                    selected={props.resultsIndex === index + 1}
                    icon={TYPE_TO_ICON[result.ComponentID]}
                    color={searchTypeToColor(result.ComponentID)}
                    text={result.Title}
                />
            ))}

            {results.length === 0 && !isLoading && (
                <BetterSearchResult
                    disabled
                    href={"#"}
                    icon={"fa fa-exclamation-triangle"}
                    text={"No results found"}
                />
            )}

            {isLoading && (
                <BetterSearchResult
                    disabled
                    href={"#"}
                    icon={"fa fa-spinner fa-spin"}
                    text={"Loading results..."}
                />
            )}
        </>
    )
}