import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import useSettings from "../../hooks/useSettings";
import getAppIDFromURL from "../../utils/tdx/getAppIDFromURL";
import confirmAction from "../../utils/confirmAction";
import useTicket from "../../hooks/useTicket";
import TicketStatus from "../../types/TicketStatus";

export default function ResolveButton() {
    const [settings] = useSettings();
    const ticket = useTicket();

    const resolveTicket = async () => {
        if (!confirmAction("Are you sure you want to resolve this ticket?"))
            return;

        // API Client
        const client = new UWStoutTDXClient();

        // Get Ticket ID
        const ticketID = getTicketIDFromURL();
        if (!ticketID)
            throw new Error("Ticket ID not found");

        // Get App ID
        const appID = getAppIDFromURL();
        if (!appID)
            throw new Error("App ID not found");

        // Update to "Resolved"
        await client.tickets.updateTicket(appID, ticketID, {
            StatusID: TicketStatus.Resolved
        });

        // Reload/Close the page
        if (settings.autoCloseTicketOnSave)
            window.close();
        else
            window.location.reload();
    }

    // Already Resolved
    const isResolved = ticket?.StatusID === TicketStatus.Resolved;
    const isClosed = ticket?.StatusID === TicketStatus.Closed;
    const isCancelled = ticket?.StatusID === TicketStatus.Cancelled;
    if (isResolved || isClosed || isCancelled)
        return null;

    // Disabled
    if (!settings.resolveButton)
        return null;
    return (
        <button
            className={"btn btn-danger btn-sm dropdown-toggle"}
            style={{margin: "0px 3px"}}
            type={"button"}
            data-toggle={"dropdown"}
            onClick={() => resolveTicket()}
            title={"Marks the ticket as resolved"}
        >
            <span className={"fa-solid fa-nopad fa-lg fa-check"}/>
            <span className={"hidden-xs padding-left-xs"}>
                Resolve
            </span>
        </button>
    )
}