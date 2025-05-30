import React from "react";
import openWindow from "../../utils/openWindow";
import useSettings from "../../hooks/useSettings";
import BetterSearchAutocomplete from "./BetterSearchAutocomplete";
import {Dropdown, FormControl} from "react-bootstrap";


export default function BetterSearch() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [settings] = useSettings();
    const [isVisible, setVisible] = React.useState(false);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setVisible(e.target.value.length > 0);
    }

    const onSearch = () => {

        // Check if the search query is a ticket ID
        const ticketIDRegex = /^\d{6,8}$/g;
        if (ticketIDRegex.test(searchQuery)) {
            // Redirect to the ticket page
            const ticketID = searchQuery.trim();
            openWindow(`/TDNext/Apps/414/Tickets/TicketDet.aspx?TicketID=${ticketID}`);
            return;
        }

        // Check if the search query is an asset tag
        const assetTagRegex = /^\d{9}$/g;
        if (assetTagRegex.test(searchQuery)) {
            // Redirect to the asset page
            const assetTag = searchQuery.trim();
            openWindow(`/TDNext/Apps/414/Assets/AssetDet.aspx?AssetTag=${assetTag}`);
            return;
        }

        // Open search window
        openWindow(`/TDNext/Apps/Shared/Global/Search?searchText=${encodeURIComponent(searchQuery)}`);
    }

    React.useEffect(() => {
        // Find the old search bar
        const searchBar = document.getElementById("globalSearchBar");
        if (!searchBar || !searchBar.parentElement)
            return;

        // Hide the old search bar
        searchBar.style.display = settings.useNewSearch ? "none" : "block";
    }, [settings]);

    if (!settings.useNewSearch)
        return null;
    return (
        <Dropdown>
            <FormControl
                data-bs-toggle={"dropdown"}
                type={"text"}
                size={"sm"}
                placeholder={"Search..."}
                autoComplete={"off"}
                onChange={onSearchChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        onSearch();
                    }
                }}
            />

            <BetterSearchAutocomplete
                isVisible={isVisible}
                onHide={() => setVisible(false)}
                searchQuery={searchQuery}
            />
        </Dropdown>
    )
}