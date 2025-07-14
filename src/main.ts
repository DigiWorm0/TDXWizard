import PageScript from "./pages/PageScript";
import HomePage from "./pages/HomePage";
import CommonPage from "./pages/CommonPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import AssetDetailsPage from "./pages/AssetDetailsPage";
import InventoryPage from "./pages/InventoryPage";
import TicketUpdatePage from "./pages/TicketUpdatePage";
import TicketCreatePage from "./pages/TicketCreatePage";
import TicketTaskPage from "./pages/TicketTaskPage";
import TicketPrintPage from "./pages/TicketPrintPage";
import PeoplePage from "./pages/PeoplePage";

// All Pages
const allPages: PageScript[] = [
    new TicketDetailsPage(),
    new AssetDetailsPage(),
    new HomePage(),
    new CommonPage(),
    new InventoryPage(),
    new TicketUpdatePage(),
    new TicketCreatePage(),
    new TicketTaskPage(),
    new TicketPrintPage(),
    new PeoplePage()
];

// Ensures the script runs after the page has loaded
(function () {
    'use strict';

    // Run the first page that can run
    for (const page of allPages) {
        if (page.canRun()) {
            try {
                page.run();
            } catch (error) {
                console.error(`Error running page: ${page.constructor.name}`);
                console.error(error);
            }
        }
    }
})();