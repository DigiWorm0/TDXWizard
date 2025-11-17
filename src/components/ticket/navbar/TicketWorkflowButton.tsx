import LocalTDXClient from "../../../tdx-api/LocalTDXClient";
import getTicketIDFromURL from "../../../tdx-api/utils/getTicketIDFromURL";
import useSettings from "../../../hooks/useSettings";
import getAppIDFromURL from "../../../tdx-api/utils/getAppIDFromURL";
import useTicket from "../../../hooks/useTicket";
import useTicketStatusID from "../../../hooks/useTicketStatusID";
import TDXButton from "../../common/TDXButton";
import StatusClass from "../../../tdx-api/types/StatusClass";
import React from "react";
import confirmAction from "../../../utils/confirmAction";
import TDXButtonGroup from "../../common/TDXButtonGroup";
import checkIsUWStout from "../../../utils/checkIsUWStout";
import useTicketFeed from "../../../hooks/useTicketFeed";

interface WorkflowOption {
    name: string;
    id: number;
    noRequestorRequired?: boolean;
    updateStatus?: boolean;
}

const PRIVATE_AUTO_REACH_OUT: WorkflowOption = {
    name: "Auto Reach Out",
    id: 1043705,
    updateStatus: true,
};

const PUBLIC_AUTO_REACH_OUT: WorkflowOption = {
    name: "Auto Reach Out (Public)",
    id: 1726514,
    noRequestorRequired: true,
    updateStatus: true,
}

const ALL_WORKFLOW_OPTIONS = [
    PRIVATE_AUTO_REACH_OUT,
    PUBLIC_AUTO_REACH_OUT,
    {name: "Ready for Pickup", id: 1959545, updateStatus: true},
];

export default function TicketWorkflowButton() {
    const [settings] = useSettings();
    const ticket = useTicket();
    const holdID = useTicketStatusID("Waiting on Client/Vendor");
    const ticketFeed = useTicketFeed();

    const suggestedWorkflow = React.useMemo(() => {
        if (!ticket)
            return null;

        if (ticket.RequestorUid === null)
            return PUBLIC_AUTO_REACH_OUT;

        return PRIVATE_AUTO_REACH_OUT;
    }, [ticket]);

    const addWorkflowToTicket = async (workflow: WorkflowOption) => {
        if (!ticket)
            throw new Error("Ticket not found");

        if (!confirmAction(`Are you sure you want to add the "${workflow.name}" workflow to this ticket?`))
            return;

        // API Client
        const client = new LocalTDXClient();

        // Get Ticket ID
        const ticketID = getTicketIDFromURL();
        if (!ticketID)
            throw new Error("Ticket ID not found");

        // Get App ID
        const appID = getAppIDFromURL();
        if (!appID)
            throw new Error("App ID not found");

        // Update Ticket Status
        let ticketStatusID = ticket.StatusID;
        if (workflow.updateStatus && settings.changeTicketStatusOnWorkflowChange)
            ticketStatusID = holdID || ticket.StatusID;

        if (ticketStatusID != ticket.StatusID) {
            await client.tickets.updateTicket(appID, ticketID, {
                StatusID: ticketStatusID,
            });
        }

        // Update Ticket
        await client.tickets.reassignWorkflow(appID, ticketID, workflow.id, true);

        // Reload/Close the page
        if (settings.autoCloseTicketOnSave)
            window.close();
        else
            window.location.reload();
    }

    // Already Resolved
    const isClosed =
        ticket?.StatusClass === StatusClass.Completed ||
        ticket?.StatusClass === StatusClass.Cancelled;
    if (isClosed)
        return null;

    // UW-Stout Only
    if (!checkIsUWStout())
        return null;

    // No Suggested Workflow
    if (!suggestedWorkflow)
        return null;


    // Hide If No Communication
    const hasCommunication = ticketFeed?.some(feedItem => !feedItem.IsPrivate);
    if (!hasCommunication && settings.hideSuggestedWorkflowIfNoCommunication)
        return null;

    // Hide If Workflow Exists
    if (settings.hideSuggestedWorkflowIfWorkflowExists && ticket?.WorkflowID)
        return null;

    // Disabled
    if (!settings.suggestWorkflows)
        return null;
    return (

        <TDXButtonGroup>
            <TDXButton
                intent={"secondary"}
                text={suggestedWorkflow.name}
                title={`Add the "${suggestedWorkflow.name}" workflow to this ticket`}
                icon={"fa fa-solid fa-nopad fa-play"}
                onClick={() => addWorkflowToTicket(suggestedWorkflow)}
                noMargin
            />

            <TDXButtonGroup noMargin>
                <TDXButton
                    noMargin
                    toggleDropdown
                    icon={"fa fa-solid fa-nopad fa-lg fa-caret-down"}
                />

                <ul
                    style={{
                        cursor: "default",
                        maxHeight: "60vh",
                        height: "auto",
                        overflowY: "auto",
                    }}
                    className={"dropdown-menu"}
                >
                    {ALL_WORKFLOW_OPTIONS.map((workflow) => {

                        // Skip workflow if requestor is required
                        const requestorRequired = !workflow.noRequestorRequired;
                        if (requestorRequired && ticket?.RequestorUid === null)
                            return null;

                        return (
                            <li key={workflow.id}>
                                <a
                                    className={"dropdown-item"}
                                    href={"#"}
                                    onClick={() => addWorkflowToTicket(workflow)}
                                >
                                    {workflow.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </TDXButtonGroup>
        </TDXButtonGroup>
    )
}