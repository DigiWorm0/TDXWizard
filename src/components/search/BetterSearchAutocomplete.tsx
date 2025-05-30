import React from "react";
import useBetterSearch from "../../hooks/useBetterSearch";
import {Dropdown} from "react-bootstrap";

export interface BetterSearchAutocompleteProps {
    searchQuery: string;
    isVisible: boolean;
    onHide: () => void;
}

const TYPE_TO_ICON: Record<number, string> = {
    9: "fa-ticket",
    27: "fa-laptop",
    31: "fa-person",
}

export default function BetterSearchAutocomplete(props: BetterSearchAutocompleteProps) {
    const [results, isLoading, error] = useBetterSearch(props.searchQuery);

    const onSelect = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Open in new window
        const href = e.currentTarget.getAttribute("href");
        window.open(href ?? "", "_blank", "width=800,height=600");

        // Close the dropdown
        props.onHide();
    }

    return (
        <Dropdown.Menu
            style={{
                maxHeight: 400,
                overflowY: "auto",
                minWidth: "100%",
            }}
        >
            {results.length === 0 && !isLoading && !error && (
                <li>
                    <a className="dropdown-item disabled">
                        <span className="fa fa-info-circle"/> No results found
                    </a>
                </li>
            )}

            {results.map((result, index) => (
                <li key={index}>
                    <a
                        href={result.DetailUrl}
                        className="dropdown-item"
                        onClick={onSelect}
                    >
                        <span className={`fa ${TYPE_TO_ICON[result.ComponentID]}`} style={{marginRight: 8}}/>
                        {result.Title}
                    </a>
                </li>
            ))}

            {isLoading && (
                <li>
                    <a className="dropdown-item disabled">
                        <span className="fa fa-spinner fa-spin"/> Loading...
                    </a>
                </li>
            )}

            {error && (
                <li>
                    <a className="dropdown-item text-danger">
                        <span className="fa fa-exclamation-triangle"/> Error: {error.message}
                    </a>
                </li>
            )}
        </Dropdown.Menu>
    )
}