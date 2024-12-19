import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import useSettings from "../../hooks/useSettings";
import getAppIDFromURL from "../../utils/tdx/getAppIDFromURL";
import useTicketWorkflow from "../../hooks/useTicketWorkflow";
import confirmAction from "../../utils/confirmAction";
import useTicket from "../../hooks/useTicket";
import TicketStatus from "../../types/TicketStatus";
import useTicketAssets from "../../hooks/useTicketAssets";

// Auto-Assign Workflow ID
const RESPOND_WORKFLOW_ID = 1177755;
const STUDENT_EMAIL_SUFFIX = "@my.uwstout.edu";

export default function EStoutPickupButton() {
    const [settings] = useSettings();
    const workflow = useTicketWorkflow();
    const ticket = useTicket();
    const ticketAssets = useTicketAssets();

    const assignWorkflow = async () => {
        if (!confirmAction("Are you sure you want to notify this student that their eStout device is ready for pickup?"))
            return;

        console.log("Assigning Workflow");

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

        // Update to "Waiting for Client/Vendor"
        await client.tickets.updateTicket(appID, ticketID, {
            StatusID: TicketStatus.WaitingForClientVendor
        });

        // Add Workflow
        await client.tickets.reassignWorkflow(appID, ticketID, RESPOND_WORKFLOW_ID, true);

        // Reload/Close the page
        if (settings.autoCloseTicketOnSave)
            window.close();
        else
            window.location.reload();
    }

    // No Assets
    const hasAssets = ticketAssets && ticketAssets.length > 0;
    if (!hasAssets)
        return null;

    // Not a Student Ticket
    const isStudent = ticket?.RequestorEmail?.endsWith(STUDENT_EMAIL_SUFFIX);
    if (!isStudent)
        return null;

    // Workflow/Status Already Set
    const isWorkflowAssigned = workflow?.WorkflowConfigurationID === RESPOND_WORKFLOW_ID;
    const isWaitingForClient = ticket?.StatusID === TicketStatus.WaitingForClientVendor;
    if (isWorkflowAssigned && isWaitingForClient)
        return null;

    // Disabled
    if (!settings.eStoutPickupButton)
        return null;
    return (
        <button
            className={"btn btn-warning btn-sm dropdown-toggle"}
            style={{margin: "0px 3px"}}
            type={"button"}
            data-toggle={"dropdown"}
            onClick={() => assignWorkflow()}
            title={"Notify Student that their eStout Device is Ready for Pickup"}
        >
            <span className={"fa-solid fa-nopad fa-lg fa-envelope"}/>
            <span className={"hidden-xs padding-left-xs"}>
                Ready for Pickup
            </span>
        </button>
    )
}