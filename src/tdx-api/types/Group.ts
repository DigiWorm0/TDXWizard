import DateTime from "./DateTime";
import GroupApplication from "./GroupApplication";

export default interface Group {
    ID: number;
    Name: string;
    Description?: string;
    IsActive: boolean;
    ExternalID?: string;
    CreatedDate: DateTime;
    ModifiedDate: DateTime;
    PlatformApplications?: GroupApplication[];
}