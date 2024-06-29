import TicketEditPage from "./pages/edit/TicketEditPage";
import TicketDetailsPage from "./pages/details/TicketDetailsPage";

const allPages = [
    new TicketEditPage(),
    new TicketDetailsPage()
];

document.body.onload = () => {
    for (const page of allPages) {
        if (page.canRun()) {
            page.run();
            break;
        }
    }
}