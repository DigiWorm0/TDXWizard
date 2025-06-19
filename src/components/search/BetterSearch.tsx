import React from "react";
import useSettings from "../../hooks/useSettings";
import BetterSearchAutocomplete from "./BetterSearchAutocomplete";
import {Dropdown, FormControl} from "react-bootstrap";


export default function BetterSearch() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [settings] = useSettings();
    const [isVisible, setVisible] = React.useState(false);

    console.log(isVisible)

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // Update visibility
        setSearchQuery(e.target.value);
        setVisible(true);
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
            const target = event.target as HTMLElement;
            if (!target.closest(".dropdown") && isVisible) {
                setVisible(false);

                console.log("HIDING");
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
        >
            <FormControl
                type={"text"}
                size={"sm"}
                placeholder={"Search..."}
                autoComplete={"off"}
                onChange={onSearchChange}

                onKeyDown={(e) => {
                    // Prevent Tab
                    if (e.key === "Tab") {
                        e.preventDefault();
                        e.stopPropagation();
                    }

                    // Allow ESC
                    if (e.key === "Escape")
                        setVisible(false);
                }}

                style={{
                    minWidth: 300,
                }}

                // Prevent bootstrap from closing the dropdown
                onClick={(e) => e.stopPropagation()}

                // Open/close the dropdown on focus/blur
                onFocus={() => setVisible(true)}
            />

            <BetterSearchAutocomplete
                isVisible={isVisible}
                onHide={() => setVisible(false)}
                searchQuery={searchQuery}
            />
        </Dropdown>
    )
}