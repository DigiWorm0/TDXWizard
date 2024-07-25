export default async function printTicket(ticketID: string) {
    // Open the ticket print page as a popup
    const ticketURL = `/TDNext/Apps/43/Tickets/TicketDetPrint?TicketID=${ticketID}`;
    const ticketPage = window.open(ticketURL, "printTicket", "width=800,height=600");
    if (!ticketPage)
        throw new Error("Could not open ticket print page.");

    // Wait for the ticket page to load
    await new Promise(resolve => ticketPage.onload = resolve);

    // Print the ticket
    ticketPage.print();

    // Close the ticket page
    ticketPage.close();
}