import Guid from "./Guid";
import AttachmentType from "./AttachmentType";
import DateTime from "./DateTime";

export default interface Attachment {
    ID: Guid;
    AttachmentType: AttachmentType;
    ItemID: number;
    CreatedUid: Guid;
    CreatedFullName: string;
    CreatedDate: DateTime;
    Name: string;
    Size: number;
    Uri: string;
    ContentUri: string;
}