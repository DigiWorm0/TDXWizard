import TicketInfo from "./TicketInfo";

export default interface TicketUpdate extends Partial<TicketInfo> {
    comments?: string;
    isPrivate?: boolean;
}