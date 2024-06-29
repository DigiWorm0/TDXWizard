import TicketType from "./TicketType";
import AutoAction from "./AutoAction";

export default interface AutoState {
    nextAction?: AutoAction;

    ticketID?: string;
    ticketType?: TicketType;
}