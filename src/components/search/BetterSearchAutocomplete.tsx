import React from "react";
import {Dropdown} from "react-bootstrap";
import BetterSearchDefaultAction from "./BetterSearchDefaultAction";
import useBetterSearch from "../../hooks/useBetterSearch";
import CustomAttributeComponent from "../../tdx-api/types/CustomAttributeComponent";

export interface BetterSearchAutocompleteProps {
    searchQuery: string;
    isVisible: boolean;
    onHide: () => void;
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
    const [results, isLoading] = useBetterSearch(props.searchQuery);

    const onSelect = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Open in new window
        const href = e.currentTarget.getAttribute("href");
        window.open(href ?? "", "_blank", "width=800,height=600");

        // Close the dropdown
        props.onHide();
    }

    const searchTypeToColor = (type: CustomAttributeComponent) => {
        if (type === CustomAttributeComponent.Asset)
            return "#007bff"; // blue for Asset
        if (type === CustomAttributeComponent.Ticket)
            return "#fd7e14"; // orange for Ticket
        if (type === CustomAttributeComponent.Person)
            return "#28a745"; // green for Person

        return "#6c757d"; // grey for other types
    }

    return (
        <Dropdown.Menu
            style={{
                maxHeight: 400,
                overflowY: "auto",
                overflowX: "hidden",
                minWidth: "100%",
                maxWidth: "100%",
            }}
        >

            {!props.searchQuery &&
                <span
                    style={{fontSize: 14}}
                    className={"text-muted fst-italic text-center w-100 d-block"}
                >
                    Start typing to search...
                </span>
            }

            {props.searchQuery && <BetterSearchDefaultAction searchQuery={props.searchQuery}/>}
            {props.searchQuery && results.map((result, index) => (
                <Dropdown.Item
                    key={index}
                    href={result.DetailUrl}
                    onClick={onSelect}
                    className={`dropdown-${result.ComponentID}`}
                    style={{
                        paddingTop: 0,
                        paddingBottom: 0,
                        fontSize: 14,
                    }}
                >
                    <span
                        className={`fa ${TYPE_TO_ICON[result.ComponentID] || "fa-question"} me-1`}
                        style={{
                            width: 20,
                            textAlign: "center",
                            color: searchTypeToColor(result.ComponentID),
                        }}
                    />
                    {result.Title}
                </Dropdown.Item>
            ))}

            {props.searchQuery && results.length === 0 && !isLoading && (
                <Dropdown.Item
                    href="#"
                    disabled
                    style={{
                        paddingTop: 0,
                        paddingBottom: 0,
                        fontSize: 14,
                    }}
                >
                    <span className="fa fa-exclamation-triangle me-1"/>
                    No results found
                </Dropdown.Item>
            )}

            {props.searchQuery && isLoading && (
                <Dropdown.Item
                    href="#"
                    disabled
                    style={{
                        paddingTop: 0,
                        paddingBottom: 0,
                        fontSize: 14,
                    }}
                >
                    <span className="fa fa-spinner fa-spin me-1"/>
                    Loading...
                </Dropdown.Item>
            )}
        </Dropdown.Menu>
    )
}