import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import SettingsButton from "../components/buttons/SettingsButton";

const URL_PREFIX = "/TDWorkManagement"

export default class HomePage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {
        HomePage.addSettingsButton();
    }

    static addSettingsButton() {
        // Get Nav Bar
        const navBar = document.getElementById("navigationHeader") as HTMLDivElement;
        if (!navBar)
            throw new Error("Nav Bar not found");

        // Get Right Side
        const rightSide = navBar.querySelector(".tdx-flex-end-container") as HTMLDivElement;
        if (!rightSide)
            throw new Error("Right Side not found");

        // Add Button
        addComponentToDOM(rightSide, <SettingsButton/>);
    }
}