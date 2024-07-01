import TicketInfo from "./TicketInfo";

export default interface TicketCreate extends Partial<TicketInfo> {
    assetName?: string;
    sourceName?: string;
    notifyRequester?: boolean;
    notifyResponsible?: boolean;
}