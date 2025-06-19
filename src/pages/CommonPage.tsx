import PageScript from "./PageScript";
import getSettings from "../utils/getSettings";
import addComponentToDOM from "../utils/addComponentToDOM";
import PersonPanel from "../components/pages/PersonPanel";
import SelectSelfButton from "../components/buttons/SelectSelfButton";
import autoUpdateAuthKey from "../utils/autoUpdateAuthKey";
import CustomStyles from "../components/style/CustomStyles";
import BetterSearch from "../components/search/BetterSearch";
import openWindow from "../utils/openWindow";
import {unsafeWindow} from "$";

export default class CommonPage implements PageScript {

    canRun() {
        return true;
    }

    run() {
        CommonPage.addCustomStyles();
        CommonPage.replaceWindowLinks();
        CommonPage.replaceAllEmailLinks();
        CommonPage.addUserLookup();
        CommonPage.addSelectSelfButton();
        CommonPage.runAutoUpdateAuthKey();
        CommonPage.replaceSearchBar();
    }

    static addCustomStyles() {
        addComponentToDOM(document.body, <CustomStyles/>);
    }

    static replaceWindowLinks() {
        // Check Settings
        const settings = getSettings();
        if (!settings.openLinksInNewWindow)
            return;

        // Patch global window functions with custom implementations
        // Explicitly calls `window.eval` to reference the global `window` object instead of the shadow DOM

        if (unsafeWindow.top === null)
            throw new Error("window.top is null, cannot replace window links");

        // Generic iFrame tab opening
        unsafeWindow.top.WorkMgmt.MainContentManager.instance.openIFrameTab = (name: string, _id: string, url: string, _tabData = false) => openWindow(url, name);

        // Child window opening
        unsafeWindow.openWinReturn = (url: string, _width: number, _height: number, name: string) => openWindow(url, name);

        // Side Panel iFrame opening
        unsafeWindow.top.WorkMgmt.MainContentManager.instance.loadSidePanelIFrame = (url: string, name: string, _id: string, _tabData = true, _landmark = true) => openWindow(url, name);

        // Child window side panel opening
        unsafeWindow.openWorkMgmtSidePanel = (url: string) => openWindow(url);

        // Search function is on its own script
        unsafeWindow.top.WorkMgmt.GlobalSearch.instance.search = (searchQuery: string) => openWindow(`/TDNext/Apps/Shared/Global/Search?searchText=${encodeURIComponent(searchQuery)}`, "Global Search");
    }

    /**
     * Adds a user lookup to the user panel
     */
    static addUserLookup() {
        const userPanel = document.querySelector(".panel-person-card");
        if (!userPanel)
            return;

        const userPanelBody = userPanel.querySelector(".media-body");
        if (!userPanelBody)
            return;

        const userLinks = addComponentToDOM(userPanelBody, <PersonPanel/>);
        userLinks.className = "gutter-top-xs ellipsis";
    }

    /**
     * Automatically updates the auth key if it is invalid
     */
    static runAutoUpdateAuthKey() {
        autoUpdateAuthKey().catch(console.error);
    }

    static replaceSearchBar() {
        // Find the old search bar
        const searchBar = document.getElementById("globalSearchBar");
        if (!searchBar || !searchBar.parentElement)
            return;

        // Hide the old search bar
        // searchBar.style.display = "none";

        // Add the new search bar
        const newSearchBar = addComponentToDOM(searchBar.parentElement, <BetterSearch/>);

        // Place before the old search bar
        searchBar.parentElement.insertBefore(newSearchBar, searchBar);
    }

    /**
     * Removes anchor from all mailto: links
     */
    static replaceAllEmailLinks() {
        // Check Settings
        const settings = getSettings();
        if (!settings.unlinkEmails)
            return;

        const runReplaceTask = () => {
            // Find all mailto links
            const mailtoLinks = document.querySelectorAll("a[href^='mailto:']");

            // Iterate through the mailto links
            for (const mailtoLink of mailtoLinks) {
                const _mailtoLink = mailtoLink as HTMLAnchorElement;

                // Get the email
                const email = _mailtoLink.href.replace("mailto:", "");

                // Replace the href with a span
                const span = document.createElement("span");
                span.textContent = email;

                // Replace the link
                _mailtoLink.replaceWith(span);
            }
        };

        setInterval(() => runReplaceTask(), 1000);
        runReplaceTask();
    }

    static addSelectSelfButton() {
        // Check Settings
        const settings = getSettings();
        if (!settings.selectSelfButton)
            return;

        // Element IDs
        const elementIDs = [
            "attribute495", // Requester
            "attribute1279", // Responsible
            "NewResponsibleId", // New Responsible
            "attribute514", // Asset Owner
            "NewOwnerUid", // New Asset Owner
        ];
        elementIDs.forEach(elementID => {

            // Get the button group
            const buttonGroup = document.querySelector(`#${elementID}_lookup`)?.parentElement;
            if (!buttonGroup)
                return;

            // Create the button container
            const buttonContainer = addComponentToDOM(
                buttonGroup,
                <SelectSelfButton formID={elementID}/>
            );
            buttonContainer.style.display = "inline-block";

            // Move element to beginning of parent
            buttonGroup.insertBefore(buttonContainer, buttonGroup.firstChild);
        });
    }
}