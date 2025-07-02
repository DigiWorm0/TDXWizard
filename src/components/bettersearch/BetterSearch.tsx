import React from "react";
import useSettings from "../../hooks/useSettings";
import BetterSearchAutocomplete from "./BetterSearchAutocomplete";
import useBetterSearch from "../../hooks/search/useBetterSearch";
import openWindow from "../../utils/openWindow";
import BetterSearchHistory from "./BetterSearchHistory";

export default function BetterSearch() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [settings] = useSettings();
    const [isVisible, setVisible] = React.useState(false);
    const [resultsIndex, setResultsIndex] = React.useState(0);
    const [results, isLoading] = useBetterSearch(searchQuery);
    const inputRef = React.useRef<HTMLInputElement>(null);

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

    const forceSearch = () => {
        if (!searchQuery)
            return;

        // Open the global search in a new window
        openWindow(`/TDNext/Apps/Shared/Global/Search?searchText=${encodeURIComponent(searchQuery)}`, "Global Search");
    }

    const onHide = () => {
        inputRef.current?.blur();
        setVisible(false);
    }

    if (!settings.useNewSearch)
        return null;
    return (
        <div
            className={`wizard_bettersearch dropdown ${isVisible ? "show" : ""}`}
        >
            <input
                ref={inputRef}
                className={"form-control form-control-sm"}
                type={"text"}
                placeholder={"Search..."}
                autoComplete={"off"}
                onChange={onSearchChange}

                onKeyDown={(e) => {
                    // Allow ESC
                    if (e.key === "Escape")
                        setVisible(false);

                    // Arrow keys/tab to navigate results
                    if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setResultsIndex((prevIndex) => (prevIndex + 1) % results.length); // Wrap around to the first result
                    }
                    if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setResultsIndex((prevIndex) => (prevIndex - 1 + results.length) % results.length); // Wrap around to the last result
                    }

                    // Home/End keys to jump to the first/last result
                    if (e.key === "Home") {
                        e.preventDefault();
                        setResultsIndex(0); // Jump to the first result
                    }
                    if (e.key === "End") {
                        e.preventDefault();
                        setResultsIndex(results.length - 1); // Jump to the last result
                    }

                    // Page Up/Page Down keys to navigate by 8 results
                    if (e.key === "PageDown") {
                        e.preventDefault();
                        setResultsIndex((prevIndex) => Math.min(prevIndex + 8, results.length - 1)); // Jump down by 8 results
                    }
                    if (e.key === "PageUp") {
                        e.preventDefault();
                        setResultsIndex((prevIndex) => Math.max(prevIndex - 8, 0)); // Jump up by 8 results
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
                        });

                        // Dispatch the click event on the active element
                        activeElement.dispatchEvent(clickEvent);
                    }
                }}

                style={{
                    minWidth: 300,
                    paddingLeft: 30
                }}

                // Prevent bootstrap from closing the dropdown
                onClick={(e) => e.stopPropagation()}

                // Open/close the dropdown on focus/blur
                onFocus={() => setVisible(true)}
            />

            <span
                className={`fa fa-search position-absolute top-50 start-0 translate-middle-y ms-2 ${isVisible ? "text-primary" : "text-muted"}`}
                style={{
                    cursor: "pointer",
                    fontSize: 16,
                }}
                onClick={(e) => {
                    // Stop the default action and propagation
                    e.preventDefault();
                    e.stopPropagation();

                    // Focus
                    const inputElement = document.querySelector(".wizard_bettersearch input");
                    if (inputElement instanceof HTMLInputElement)
                        inputElement.focus();

                    // If content, open the global search in a new window
                    forceSearch();
                }}
            />

            <div
                className={`dropdown-menu dropdown-menu-end ${isVisible ? "show" : ""}`}
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
                    <BetterSearchHistory
                        onHide={onHide}
                    />
                )}

                {searchQuery && (
                    <BetterSearchAutocomplete
                        results={results}
                        isLoading={isLoading}
                        resultsIndex={resultsIndex}
                        setResultsIndex={setResultsIndex}
                        onHide={onHide}
                    />
                )}
            </div>
        </div>
    )
}