import PageScript from "./pages/PageScript";
import HomePage from "./pages/HomePage";
import CommonPage from "./pages/CommonPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import AssetDetailsPage from "./pages/AssetDetailsPage";

// All Pages
const allPages: PageScript[] = [
    new TicketDetailsPage(),
    new AssetDetailsPage(),
    new HomePage(),
    new CommonPage()
];

// Run the first page that can run
for (const page of allPages) {
    if (page.canRun())
        page.run();
}