import confirmAction from "../../utils/confirmAction";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import AppID from "../../types/AppID";
import useSettings from "../../hooks/useSettings";
import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import useTicket from "../../hooks/useTicket";

export default function ConvertSurplusTicketButton() {
    const [settings] = useSettings();
    const ticket = useTicket();

    const onClick = async () => {
        if (confirmAction("Make this a surplus ticket?")) {
            const client = new UWStoutTDXClient();

            // Get Ticket ID
            const ticketID = getTicketIDFromURL();
            if (!ticketID)
                throw new Error("Ticket ID not found");

            // Get Ticket
            const _ticket = await client.tickets.getTicket(AppID.Tickets, ticketID);
            if (!_ticket)
                throw new Error("Ticket not found");

            // Edit Ticket
            await client.tickets.editTicket(AppID.Tickets, ticketID, {
                ..._ticket,
                FormID: 1061 // Surplus
            });

            // Refresh/Close Page
            if (settings.autoCloseTicketOnSave)
                window.close();
            else
                window.location.reload();
        }
    }

    // Surplus Form Already
    if (ticket?.FormID === 1061)
        return null;

    // Not a Surplus Ticket
    if (!ticket?.Title.toLowerCase().includes("surplus"))
        return null;

    // Disabled
    if (!settings.showSurplusButtons)
        return null;

    return (
        <button
            type={"button"}
            className={"btn btn-warning btn-sm"}
            style={{margin: "0px 3px"}}
            title={"Create Surplus Ticket"}
            onClick={onClick}
        >
            <span className={"fa fa-solid fa-ticket fa-nopad"}/>
            <span className={"hidden-xs padding-left-xs"}>Convert Surplus</span>
        </button>
    )
}