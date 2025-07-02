import PageScript from "./PageScript";
import InventoryNavBar from "../components/inventory/InventoryNavBar";
import addComponentToDOM from "../utils/addComponentToDOM";

const appIDRegex = /menu_\d+_TDAssets/;

export default class InventoryPage implements PageScript {

    canRun(): boolean {
        return true;
    }

    run(): void {
        setInterval(() => {
            const inventoryNavBars = document.querySelectorAll(".tdx-action-menu");

            inventoryNavBars.forEach((navBar) => {

                // Get the app ID from the nav bar
                const appIDMatches = navBar.id.match(appIDRegex);
                if (!appIDMatches)
                    return;
                const appID = parseInt(appIDMatches[0].split("_")[1]);

                // Check if the inventory button is already added
                const inventoryButton = navBar.querySelector(".wizard_inventory");
                if (inventoryButton)
                    return;

                // Create the inventory button
                const newInventoryButton = addComponentToDOM(navBar, <InventoryNavBar appID={appID}/>);
                if (!newInventoryButton)
                    return;

                // Move to before bettersearch
                const search = navBar.querySelector(".tdx-action-menu-input");
                if (!search)
                    return;
                navBar.insertBefore(newInventoryButton, search);
            });
        }, 1000);
    }

}