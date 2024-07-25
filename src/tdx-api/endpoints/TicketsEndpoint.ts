import TDXEndpoint from "../TDXEndpoint";
import Ticket from "../types/Ticket";
import User from "../types/User";
import TicketCreateOptions from "../types/TicketCreateOptions";

/**
 * A class for interacting with the TDX Tickets API
 */
export default class TicketsEndpoint extends TDXEndpoint {
    getTicket(appID: number, id: number) {
        return this.client.jsonRequest<Ticket>(`${appID}/tickets/${id}`);
    }

    createTicket(appID: number, ticket: Partial<Ticket>, options: TicketCreateOptions, applyDefaults: boolean = true) {
        const urlParams = new URLSearchParams({
            EnableNotifyReviewer: options.EnableNotifyReviewer.toString(),
            NotifyRequestor: options.NotifyRequestor.toString(),
            NotifyResponsible: options.NotifyResponsible.toString(),
            AllowRequestorCreation: options.AllowRequestorCreation.toString(),
            applyDefaults: applyDefaults.toString()
        });

        return this.client.jsonRequest<Ticket>(
            `${appID}/tickets?${urlParams.toString()}`,
            {...ticket, ...options},
            "POST"
        );
    }

    editTicket(appID: number, id: number, ticket: Ticket, notifyNewResponsible: boolean = false) {
        return this.client.jsonRequest<Ticket>(
            `${appID}/tickets/${id}?notifyNewResponsible=${notifyNewResponsible}`,
            {...ticket, notifyNewResponsible},
            "POST"
        );
    }

    async updateTicket(appID: number, id: number, update: Partial<Ticket>, notifyNewResponsible: boolean = false) {
        const ticket = await this.getTicket(appID, id);
        return this.editTicket(appID, id, {...ticket, ...update}, notifyNewResponsible);
    }

    getTicketContacts(appID: number, id: number) {
        return this.client.jsonRequest<User[]>(`${appID}/tickets/${id}/contacts`);
    }

    // getTicketAssets(appID: number, id: number) {
    //     return this.client.jsonRequest<ConfigurationItem>(`${appID}/tickets/${id}/assets`);
    // }
    //
    // getTicketFeed(appID: number, id: number) {
    //     return this.client.jsonRequest<FeedItem[]>(`${appID}/tickets/${id}/feed`);
    // }

}