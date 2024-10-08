import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import useSettings from "../../hooks/useSettings";
import getAppIDFromURL from "../../utils/tdx/getAppIDFromURL";
import useTicketWorkflow from "../../hooks/useTicketWorkflow";

// Auto-Assign Workflow ID
const WORKFLOW_ID = 1043705;

export default function AddWorkflowButton() {
    const [settings] = useSettings();
    const workflow = useTicketWorkflow();

    console.log(workflow)

    const assignWorkflow = async () => {
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

        // Edit Ticket
        const res = await client.tickets.reassignWorkflow(appID, ticketID, WORKFLOW_ID);
        console.log(res);

        // Reload/Close the page
        if (settings.autoCloseTicketOnSave)
            window.close();
        else
            window.location.reload();
    }
    
    if (workflow || !settings.addWorkflowButton)
        return null;
    return (
        <button
            className={"btn btn-warning btn-sm dropdown-toggle"}
            type={"button"}
            data-toggle={"dropdown"}
            onClick={() => assignWorkflow()}
        >
            <span className={"fa-solid fa-nopad fa-lg fa-plus"}/>
            <span className={"hidden-xs padding-left-xs"}>
                Add Workflow
            </span>
        </button>
    )
}