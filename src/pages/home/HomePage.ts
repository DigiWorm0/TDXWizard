import PageScript from "../PageScript";
import SettingsModal from "./SettingsModal";

const URL_PREFIX = "/TDNext/Home/Desktop/Default"

export default class HomePage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {

        // Add Buttons
        HomePage.addSettingsButton();
    }

    static addSettingsButton() {
        // Create Modal
        const settingsModal = new SettingsModal();

        // Get Nav Bar
        const navBar = document.getElementById("divHeader") as HTMLDivElement;
        if (!navBar)
            throw new Error("Nav Bar not found");

        // Get Right Side
        const rightSide = navBar.querySelector(".pull-right") as HTMLDivElement;
        if (!rightSide)
            throw new Error("Right Side not found");

        // Add Button
        const button = document.createElement("button") as HTMLButtonElement;
        button.className = "btn btn-link black btn-desktop";
        button.onclick = () => settingsModal.open();
        button.title = "TDXBuddy Settings";
        button.type = "button";
        rightSide.appendChild(button);

        // Add Icon
        const icon = document.createElement("span");
        icon.className = "fa fa-toolbox";
        button.appendChild(icon);
    }
}