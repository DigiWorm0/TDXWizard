import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import CustomTemplateMenu from "../components/pages/CustomTemplateMenu";
import getSettings from "../utils/getSettings";
import ReplacementTemplatesButton from "../components/buttons/ReplacementTemplatesButton";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d*\/Tickets\/Update/g;

export default class TicketUpdatePage implements PageScript {

    canRun() {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run() {
        TicketUpdatePage.addCustomTemplateMenu();
        TicketUpdatePage.removeCopyButton();
    }

    static addCustomTemplateMenu() {

        // Check Settings
        const settings = getSettings();
        if (!settings.enableCustomTemplates)
            return;

        // Navbar
        let templateDropdown = document.querySelector("#divComments .dropdown-menu.multi-level");
        if (!templateDropdown) {
            const pullLeft = document.querySelector("#divComments .pull-left");
            if (!pullLeft)
                throw new Error("Pull left not found");

            const replacementButton = addComponentToDOM(pullLeft, <ReplacementTemplatesButton/>);
            replacementButton.className = "dropdown padding-left-xs";
            replacementButton.style.position = "relative";
            replacementButton.style.top = "2px";
        } else {
            const customMenu = addComponentToDOM(templateDropdown, <CustomTemplateMenu/>, {elementType: "li"});
            customMenu.className = "dropdown-submenu";
            customMenu.style.display = "";
        }
    }

    static removeCopyButton() {
        // Check Settings
        const {removeCopyURLButton} = getSettings();
        if (!removeCopyURLButton)
            return;

        // Remove Copy Button
        const copyButton = document.getElementById("btnCopyUrl");
        if (copyButton)
            copyButton.remove();
    }
}