import PageScript from "../PageScript";
import { getAutoState, setAutoState } from "../../utils/autoState";
import DefaultSettings from "../../db/DefaultSettings";
import selectTicketType from "./selectTicketType";
import saveTicket from "./saveTicket";
import selectTicketStatus from "./selectTicketStatus";
import closeWindow from "../../utils/closeWindow";

const URL_PREFIX = "/TDNext/Apps/43/Tickets/Edit";

export default class TicketEditPage implements PageScript {
    canRun(): boolean {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run(): void {
        // Get the auto state
        const autoState = getAutoState();

        // Automatically select the ticket type
        if (autoState.nextAction === "setTicketType") {

            // Get the ticket type
            const ticketType = autoState.ticketType;
            if (!ticketType)
                throw new Error("Ticket type not set in auto state");

            // Set Next Action
            if (DefaultSettings.autoCloseTicketOnSave)
                setAutoState({ nextAction: "closeWindow" });
            else
                setAutoState({});

            // Select the ticket type and save
            selectTicketType(ticketType)
                .then(saveTicket)
                .catch(console.error);
        }

        // Automatically cancel the ticket
        if (autoState.nextAction === "markTicketSpam") {

            // Set Next Action
            if (DefaultSettings.autoCloseTicketOnSave)
                setAutoState({ nextAction: "closeWindow" });
            else
                setAutoState({});

            // Select the ticket status and save
            selectTicketStatus("Cancelled");
            saveTicket();
        }

        // Close the window after saving
        if (autoState.nextAction === "closeWindow") {
            setAutoState({});
            closeWindow();
        }
    }
}