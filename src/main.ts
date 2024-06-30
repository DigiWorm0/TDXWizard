import TicketDetailsPage from "./pages/ticketDetails/TicketDetailsPage";
import PageScript from "./pages/PageScript";
import AssetDetailsPage from "./pages/assetDetails/AssetDetailsPage";
import AssignmentLookupPage from "./pages/assignmentLookup/AssignmentLookupPage";

// Debugging
console.log(window.location.pathname);

// All Pages
const allPages: PageScript[] = [
    new TicketDetailsPage(),
    new AssignmentLookupPage(),
    new AssetDetailsPage(),
];

// Run the first page that can run
for (const page of allPages) {
    if (page.canRun())
        page.run();
}