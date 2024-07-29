import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import InventoryNavBar from "../components/pages/InventoryNavBar";

const URL_PREFIX = "/TDNext/Apps/44/Assets/Default";

export default class InventoryPage implements PageScript {
    canRun(): boolean {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run(): void {
        const inventoryNavBar = document.querySelector("#divTabHeader .nav");
        if (!inventoryNavBar)
            throw new Error("Nav Bar not found");
        addComponentToDOM(inventoryNavBar, <InventoryNavBar/>, {elementType: "li"});
    }

}