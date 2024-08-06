import PageScript from "./PageScript";
import getSettings from "../utils/getSettings";
import addComponentToDOM from "../utils/addComponentToDOM";
import PersonPanel from "../components/pages/PersonPanel";
import SelectSelfButton from "../components/buttons/SelectSelfButton";

const URL_PREFIX = "/TDNext"

export default class CommonPage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {
        CommonPage.replaceAllEmailLinks();
        CommonPage.addUserLookup();
        CommonPage.addSelectSelfButton();
    }

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
            "NewResponsibleId" // New Responsible
        ];
        elementIDs.forEach(elementID => {

            // Get the button group
            const buttonGroupA = document.querySelector(`#${elementID}-grp .input-group .input-group-btn`);
            const buttonGroupB = document.querySelector(`#s2id_${elementID}`)?.parentElement?.querySelector(".input-group-btn");
            const buttonGroup = buttonGroupA || buttonGroupB;
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