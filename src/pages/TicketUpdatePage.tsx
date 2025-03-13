import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import CustomTemplateMenu from "../components/pages/CustomTemplateMenu";
import getSettings from "../utils/getSettings";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d*\/Tickets\/Update/g;

export default class TicketUpdatePage implements PageScript {

    canRun() {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run() {
        TicketUpdatePage.addCustomTemplateMenu();
    }

    static addCustomTemplateMenu() {

        // Check Settings
        const settings = getSettings();
        if (!settings.enableCustomTemplates)
            return;

        // Navbar
        const templateDropdown = document.querySelector("#divComments .dropdown-menu.multi-level");
        if (!templateDropdown)
            throw new Error("Template Dropdown not found");

        const customMenu = addComponentToDOM(templateDropdown, <CustomTemplateMenu/>, {elementType: "li"});
        customMenu.className = "dropdown-submenu";
        customMenu.style.display = "";
    }
}