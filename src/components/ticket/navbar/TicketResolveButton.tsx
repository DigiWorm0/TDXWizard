import LocalTDXClient from "../../../tdx-api/LocalTDXClient";
import getTicketIDFromURL from "../../../tdx-api/utils/getTicketIDFromURL";
import useSettings from "../../../hooks/useSettings";
import getAppIDFromURL from "../../../tdx-api/utils/getAppIDFromURL";
import confirmAction from "../../../utils/confirmAction";
import useTicket from "../../../hooks/useTicket";
import useTicketStatusID from "../../../hooks/useTicketStatusID";
import TDXButton from "../../common/TDXButton";
import StatusClass from "../../../tdx-api/types/StatusClass";

export default function TicketResolveButton() {
    const [settings] = useSettings();
    const ticket = useTicket();
    const resolvedID = useTicketStatusID("Resolved");

    const closeAllTicketTasks = async (appID: number, ticketID: number) => {
        // API Client
        const client = new LocalTDXClient();

        // Get Tasks
        const tasks = await client.ticketTasks.getTicketTasks(appID, ticketID);

        // Close each task
        for (const task of tasks) {
            if (task.PercentComplete === 100)
                continue;

            await client.ticketTasks.updateTicketTaskFeed(appID, ticketID, task.ID, {
                PercentComplete: 100
            }).catch(console.warn);
        }
    }

    const resolveTicket = async () => {
        if (!confirmAction("Are you sure you want to resolve this ticket?"))
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

        // Update to "Resolved"
        await client.tickets.updateTicket(appID, ticketID, {
            StatusID: resolvedID ?? 0,
        });

        // Close Tasks
        if (settings.closeAllTasksOnResolve)
            await closeAllTicketTasks(appID, ticketID);

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

    // Disabled
    if (!settings.resolveButton)
        return null;
    return (
        <TDXButton
            intent={"secondary"}
            text={"Resolve"}
            title={"Marks the ticket as resolved"}
            icon={"fa fa-solid fa-nopad fa-check"}
            onClick={() => resolveTicket()}
        />
    )
}