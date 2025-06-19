import React from "react";
import useSettings from "../../hooks/useSettings";
import BetterSearchAutocomplete from "./BetterSearchAutocomplete";
import {Dropdown, FormControl} from "react-bootstrap";
import useBetterSearch from "../../hooks/useBetterSearch";
import BetterSearchDefaultAction from "./BetterSearchDefaultAction";

export default function BetterSearch() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [settings] = useSettings();
    const [isVisible, setVisible] = React.useState(false);
    const [resultsIndex, setResultsIndex] = React.useState(0);
    const [results, isLoading] = useBetterSearch(searchQuery);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // Update visibility
        setSearchQuery(e.target.value);
        setVisible(true);
        setResultsIndex(0);
    }

    React.useEffect(() => {
        // Find the old search bar
        const searchBar = document.getElementById("globalSearchBar");
        if (!searchBar || !searchBar.parentElement)
            return;

        // Hide the old search bar
        searchBar.style.display = settings.useNewSearch ? "none" : "block";
    }, [settings]);

    React.useEffect(() => {
        // If the user clicks outside the dropdown, hide it
        const handleClickOutside = (event: MouseEvent) => {
            try {
                // Find the target element
                const target = event.target as HTMLElement;
                if (!target.closest(".dropdown") && isVisible)
                    setVisible(false);
            } catch (e) {
                // Catch any errors that might occur if clicking outside the document
                setVisible(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => document.removeEventListener("click", handleClickOutside);
    }, [isVisible]);

    if (!settings.useNewSearch)
        return null;
    return (
        <Dropdown
            show={isVisible}
            align={"end"}
            className={"wizard_bettersearch"}
        >
            <FormControl
                type={"text"}
                size={"sm"}
                placeholder={"Search..."}
                autoComplete={"off"}
                onChange={onSearchChange}

                onKeyDown={(e) => {
                    // Allow ESC
                    if (e.key === "Escape")
                        setVisible(false);

                    // Arrow keys/tab to navigate results
                    if (e.key === "ArrowDown" || e.key === "Tab") {
                        e.preventDefault();
                        setResultsIndex((prevIndex) => Math.min(prevIndex + 1, results.length)); // Prevent going above the last index
                    }
                    if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setResultsIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Prevent going below 0
                    }

                    // Handle Enter key to send onClick to the selected result
                    if (e.key === "Enter") {
                        e.preventDefault();

                        // Find the .active element in the dropdown
                        const activeElement = document.querySelector(".dropdown-menu .active");
                        if (!activeElement)
                            return;

                        // Create a click event
                        const clickEvent = new MouseEvent("click", {
                            bubbles: true,
                            cancelable: true,
                            view: window,
                        });

                        // Dispatch the click event on the active element
                        activeElement.dispatchEvent(clickEvent);
                    }
                }}

                style={{
                    minWidth: 300,
                }}

                // Prevent bootstrap from closing the dropdown
                onClick={(e) => e.stopPropagation()}

                // Open/close the dropdown on focus/blur
                onFocus={() => setVisible(true)}
            />

            <Dropdown.Menu
                style={{
                    maxHeight: 400,
                    overflowY: "auto",
                    overflowX: "hidden",
                    minWidth: "100%",
                    maxWidth: "100%",
                    paddingTop: 6,
                    paddingBottom: 6,
                }}
            >
                {!searchQuery && (
                    <span
                        style={{fontSize: 14}}
                        className={"text-muted fst-italic text-center w-100 d-block"}
                    >
                        Start typing to search...
                    </span>
                )}

                {searchQuery && (
                    <BetterSearchDefaultAction
                        searchQuery={searchQuery}
                        active={resultsIndex === 0}
                    />
                )}

                {searchQuery && (
                    <BetterSearchAutocomplete
                        results={results}
                        isLoading={isLoading}
                        resultsIndex={resultsIndex}
                        setResultsIndex={setResultsIndex}
                    />
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
}