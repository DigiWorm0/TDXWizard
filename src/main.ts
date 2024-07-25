import PageScript from "./pages/PageScript";
import HomePage from "./pages/home/HomePage";
import CommonPage from "./pages/common/CommonPage";
import TicketDetailsPage from "./pages/ticketDetails/TicketDetailsPage";
import AssetDetailsPage from "./pages/assetDetails/AssetDetailsPage";
import AssignmentLookupPage from "./pages/assignmentLookup/AssignmentLookupPage";

// All Pages
const allPages: PageScript[] = [
    new TicketDetailsPage(),
    new AssignmentLookupPage(),
    new AssetDetailsPage(),
    new HomePage(),
    new CommonPage()
];

// Run the first page that can run
for (const page of allPages) {
    if (page.canRun())
        page.run();
}