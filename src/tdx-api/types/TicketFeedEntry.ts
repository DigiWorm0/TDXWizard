export default interface TicketFeedEntry {
    // The ID of the new status for the ticket. Leave null or 0 to not change the status.
    NewStatusID: number;

    // A field that can be passed into the update ticket API specifying whether it should cascade the status update. Defaults to false.
    CascadeStatus?: boolean;

    // The comments of the feed entry.
    Comments: string;

    // The email addresses to notify associated with the feed entry.
    Notify?: string[];

    // The private status of the feed entry.
    IsPrivate: boolean,

    // Indicates if the feed entry is rich-text or plain-text.
    IsRichHtml: boolean,

    // Set the feed entry as a communications record
    IsCommunication?: boolean,
}