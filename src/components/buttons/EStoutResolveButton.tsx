import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import useSettings from "../../hooks/useSettings";
import getAppIDFromURL from "../../utils/tdx/getAppIDFromURL";
import confirmAction from "../../utils/confirmAction";
import useTicket from "../../hooks/useTicket";
import TicketStatus from "../../types/TicketStatus";
import useTicketWorkflow from "../../hooks/useTicketWorkflow";

// Workflow ID
const RESPOND_WORKFLOW_ID = 1177755;

export default function EStoutResolveButton() {
    const [settings] = useSettings();
    const ticket = useTicket();
    const ticketWorkflow = useTicketWorkflow();

    const resolveTicket = async () => {
        if (!confirmAction("Are you sure you want to mark this eStout device as picked up?"))
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

        // Add a feed entry
        await client.tickets.addTicketFeed(appID, ticketID, {
            NewStatusID: TicketStatus.Resolved,
            IsCommunication: true,
            IsPrivate: true,
            IsRichHtml: false,
            Comments: "Device has been picked up."
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

    // Doesn't have the workflow
    console.log(ticketWorkflow);
    const hasWorkflow = ticketWorkflow?.WorkflowConfigurationID === RESPOND_WORKFLOW_ID;
    console.log(hasWorkflow);
    if (!hasWorkflow)
        return null;

    // Disabled
    if (!settings.eStoutResolveButton)
        return null;
    return (
        <button
            className={"btn btn-warning btn-sm dropdown-toggle"}
            style={{margin: "0px 3px"}}
            type={"button"}
            data-toggle={"dropdown"}
            onClick={() => resolveTicket()}
            title={"Marks the eStout laptop as picked up"}
        >
            <span className={"fa-solid fa-nopad fa-lg fa-check"}/>
            <span className={"hidden-xs padding-left-xs"}>
                Picked Up
            </span>
        </button>
    )
}