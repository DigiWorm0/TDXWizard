import PageScript from "./PageScript";
import getSettings from "../utils/getSettings";
import addComponentToDOM from "../utils/addComponentToDOM";
import PersonPanel from "../components/pages/PersonPanel";
import SelectSelfButton from "../components/buttons/SelectSelfButton";
import autoUpdateAuthKey from "../utils/autoUpdateAuthKey";
import CustomStyles from "../components/style/CustomStyles";

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
    }

    static addCustomStyles() {
        addComponentToDOM(document.body, <CustomStyles/>);
    }

    static replaceWindowLinks() {
        // Check Settings
        const settings = getSettings();
        if (!settings.openLinksInNewWindow)
            return;

        // Replace the default implementation of window.openWinHref
        window.openWinReturn = (
            url: string,
            width = 992,
            height = 800,
            name: string = "New Window"
        ) => {
            window.open(url, name, `width=${width},height=${height}`);
            return false;
        }
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