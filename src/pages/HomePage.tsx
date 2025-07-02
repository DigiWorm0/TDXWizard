import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import SettingsButton from "../components/settings/SettingsButton";
import DashboardButtons from "../components/dashboard/DashboardButtons";

const URL_PREFIX = "/TDWorkManagement"

export default class HomePage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {
        HomePage.addSettingsButton();
        HomePage.addDashboardButtons();
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

    static addDashboardButtons() {
        // Get Dashboard Nav
        const dashboardNav = document.querySelector("#divDashboardHeader .tdx-action-menu");
        if (!dashboardNav)
            throw new Error("Dashboard Nav not found");

        // Add Buttons
        const dashboardButtons = addComponentToDOM(dashboardNav, <DashboardButtons/>);

        // Make 1st child
        dashboardNav.insertBefore(dashboardButtons, dashboardNav.firstChild);
    }
}