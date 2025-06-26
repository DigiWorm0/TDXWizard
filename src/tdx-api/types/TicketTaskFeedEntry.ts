export default interface TicketTaskFeedEntry {
    PercentComplete?: number;
    Comments: string;
    Notify?: string[];
    IsPrivate: boolean;
    IsRichHtml: boolean;
    IsCommunication?: boolean;
}