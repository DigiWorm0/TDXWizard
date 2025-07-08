import confirmAction from "../../../utils/confirmAction";
import LocalTDXClient from "../../../tdx-api/LocalTDXClient";
import useSettings from "../../../hooks/useSettings";
import getTicketIDFromURL from "../../../tdx-api/utils/getTicketIDFromURL";
import useTicket from "../../../hooks/useTicket";
import TDXButton from "../../common/TDXButton";
import UWStoutAppID from "../../../types/UWStoutAppID";

const SURPLUS_FORM_ID = 1061; // Surplus Form ID

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
            const ticket = await client.tickets.getTicket(UWStoutAppID.Tickets, ticketID);
            if (!ticket)
                throw new Error("Ticket not found");

            // Edit Ticket
            await client.tickets.editTicket(UWStoutAppID.Tickets, ticketID, {
                ...ticket,
                FormID: SURPLUS_FORM_ID // Surplus
            });

            // Refresh/Close Page
            if (settings.autoCloseTicketOnSave)
                window.close();
            else
                window.location.reload();
        }
    }

    // Surplus Form Already
    if (ticket?.FormID === SURPLUS_FORM_ID)
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