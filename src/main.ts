import PageScript from "./pages/PageScript";
import HomePage from "./pages/HomePage";
import CommonPage from "./pages/CommonPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import AssetDetailsPage from "./pages/AssetDetailsPage";
import PrintPage from "./pages/PrintPage";
import InventoryPage from "./pages/InventoryPage";

// All Pages
const allPages: PageScript[] = [
    new TicketDetailsPage(),
    new AssetDetailsPage(),
    new HomePage(),
    new PrintPage(),
    new CommonPage(),
    new InventoryPage()
];

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