import Guid from "./Guid";
import DateTime from "./DateTime";

export default interface ConfigurationItem {
    ID: number;
    AppID: number;
    AppName: string;
    FormID: number;
    FormName: string;
    IsSystemMaintained: boolean;
    BackingItemID: number;
    //BackingItemType
    Name: string;
    TypeID: number;
    TypeName: string;
    MaintenanceScheduleID: number;
    MaintenanceScheduleName: string;
    OwnerUID: Guid;
    OwnerFullName: string;
    OwningDepartmentID: number;
    OwningDepartmentName: string;
    OwningGroupID: number;
    OwningGroupName: string;
    LocationID: number;
    LocationName: string;
    LocationRoomID: number;
    LocationRoomName: string;
    IsActive: boolean;
    CreatedDateUtc: DateTime;
    CreatedUid: Guid;
    CreatedFullName: string;
    ModifiedDateUtc: DateTime;
    ModifiedUid: Guid;
    ModifiedFullName: string;
    ExternalID: string;
    ExternalSourceID: number;
    ExternalSourceName: string;
    //Attributes
    //Attachments
    Uri: string;
}