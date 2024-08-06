import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import CustomTemplateMenu from "../components/pages/CustomTemplateMenu";

const URL_PREFIX = "/TDNext/Apps/43/Tickets/Update"

export default class TicketUpdatePage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {
        // Navbar
        const templateDropdown = document.querySelector("#divComments .dropdown-menu.multi-level");
        if (!templateDropdown)
            throw new Error("Template Dropdown not found");

        const customMenu = addComponentToDOM(templateDropdown, <CustomTemplateMenu/>, {elementType: "li"});
        customMenu.className = "dropdown-submenu";
        customMenu.style.display = "";
    }
}