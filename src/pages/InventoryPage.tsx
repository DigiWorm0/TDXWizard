import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import InventoryNavBar from "../components/pages/InventoryNavBar";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d+\/Assets\/Default/;

export default class InventoryPage implements PageScript {
    canRun(): boolean {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run(): void {
        const inventoryNavBar = document.querySelector("#divTabHeader .nav");
        if (!inventoryNavBar)
            throw new Error("Nav Bar not found");
        addComponentToDOM(inventoryNavBar, <InventoryNavBar/>, {elementType: "li"});
    }

}