import TDXEndpoint from "../TDXEndpoint";
import TicketTaskFeedEntry from "../types/TicketTaskFeedEntry";
import TicketTask from "../types/TicketTask";
import FeedItemUpdate from "../types/FeedItemUpdate";

/**
 * A class for interacting with the TDX Ticket Tasks API
 */
export default class TicketTasksEndpoint extends TDXEndpoint {

    updateTicketTaskFeed(appID: number, ticketID: number, taskID: number, update: Partial<TicketTaskFeedEntry>) {
        return this.client.jsonRequest<TicketTaskFeedEntry>(
            `${appID}/tickets/${ticketID}/tasks/${taskID}/feed`,
            update,
            "POST"
        );
    }

    getTicketTasks(appID: number, ticketID: number, isEligiblePredecessor: boolean | null = null) {
        return this.client.jsonRequest<TicketTask[]>(
            `${appID}/tickets/${ticketID}/tasks?isEligiblePredecessor=${isEligiblePredecessor}`
        );
    }

    editTicketTask(appID: number, ticketID: number, taskID: number, newTask: TicketTask) {
        return this.client.jsonRequest<TicketTask>(
            `${appID}/tickets/${ticketID}/tasks/${taskID}`,
            newTask,
            "PUT"
        );
    }

    getTicketTask(appID: number, ticketID: number, taskID: number) {
        return this.client.jsonRequest<TicketTask>(
            `${appID}/tickets/${ticketID}/tasks/${taskID}`
        );
    }

    getTicketTaskFeed(appID: number, ticketID: number, taskID: number) {
        return this.client.jsonRequest<FeedItemUpdate[]>(
            `${appID}/tickets/${ticketID}/tasks/${taskID}/feed`
        );
    }
}