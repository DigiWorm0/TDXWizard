import DateTime from "./DateTime";
import Guid from "./Guid";

export default interface TicketType {
    ID: number;
    AppID: number;
    AppName: string;
    Name: string;
    Description: string;
    CategoryID: number;
    CategoryName: string;
    FullName: string;
    IsActive: boolean;
    CreatedDate: DateTime;
    CreatedByUid: string;
    ModifiedDate: DateTime;
    ModifiedByUid: string;
    ReviewerUid: Guid;
    ReviewerFullName: string;
    ReviewerEmail: string;
    ReviewerGroupID: number;
    ReviewerGroupName: string;
    NotifyReviewer: boolean;
    OtherNotificationEmailAddresses: string;
    DefaultSLAID: number;
    DefaultSLAName: string;
    DefaultSLAIsActive: boolean;
    WorkspaceID: number;
    WorkspaceName: string;
    ShouldAlertResponsibleOnTaskClose: boolean;
}