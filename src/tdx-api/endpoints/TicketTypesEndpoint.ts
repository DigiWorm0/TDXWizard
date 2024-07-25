import TDXEndpoint from "../TDXEndpoint";
import TicketType from "../types/TicketType";

/**
 * A class for interacting with the TDX Ticket Types API
 */
export default class TicketsTypesEndpoint extends TDXEndpoint {
    getTicketTypes(appID: number, isActive: boolean = true) {
        return this.client.jsonRequest<TicketType[]>(`${appID}/tickets/types?isActive=${isActive}`);
    }
}