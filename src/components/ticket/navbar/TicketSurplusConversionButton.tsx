import confirmAction from "../../../utils/confirmAction";
import LocalTDXClient from "../../../tdx-api/LocalTDXClient";
import AppID from "../../../types/AppID";
import useSettings from "../../../hooks/useSettings";
import getTicketIDFromURL from "../../../tdx-api/utils/getTicketIDFromURL";
import useTicket from "../../../hooks/useTicket";
import TDXButton from "../../common/TDXButton";

export default function TicketSurplusConversionButton() {
    const [settings] = useSettings();
    const ticket = useTicket();

    const onClick = async () => {
        if (confirmAction("Make this a surplus ticket?")) {
            const client = new LocalTDXClient();

            // Get Ticket ID
            const ticketID = getTicketIDFromURL();
            if (!ticketID)
                throw new Error("Ticket ID not found");

            // Get Ticket
            const ticket = await client.tickets.getTicket(AppID.Tickets, ticketID);
            if (!ticket)
                throw new Error("Ticket not found");

            // Edit Ticket
            await client.tickets.editTicket(AppID.Tickets, ticketID, {
                ...ticket,
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
        <TDXButton
            intent={"secondary"}
            onClick={onClick}
            title={"Convert to Surplus Ticket"}
            icon={"fa fa-solid fa-ticket"}
            text={"Convert Surplus"}
        />
    )
}