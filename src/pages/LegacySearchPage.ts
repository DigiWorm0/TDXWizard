import PageScript from "./PageScript";
import {GM_getValue, GM_setValue} from "$";

const URL_PREFIX = "/helpdesk/default.aspx";

export default class LegacySearchPage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {
        LegacySearchPage.trySearchUser();
    }

    static trySearchUser() {

        // Get the username
        const username = GM_getValue("__tdxwizard-search") as string;
        if (!username)
            return;
        GM_setValue("__tdxwizard-search", "");

        // Set the search input
        const searchInput = document.getElementById("ctl09_Searchtb") as HTMLInputElement;
        if (!searchInput)
            throw new Error("Search input not found");
        searchInput.value = username;

        // Submit the form
        const searchButton = document.getElementById("ctl09_searchbtn") as HTMLButtonElement;
        if (!searchButton)
            throw new Error("Search button not found");
        searchButton.click();

        console.log("Search button clicked for user: " + username);
    }
}