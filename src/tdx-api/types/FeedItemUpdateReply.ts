import Guid from "./Guid";
import DateTime from "./DateTime";

export default interface FeedItemUpdateReply {
    ID: number;
    Body: string;
    IsRichHtml: boolean;
    CreatedUid: Guid;
    CreatedRefID: number;
    CreatedFullName: string;
    CreatedFirstName?: string;
    CreatedLastName?: string;
    CreatedByPicPath?: string;
    CreatedDate: DateTime;
}