import DateTime from "./DateTime";
import CustomAttribute from "./CustomAttribute";

export default interface Account {
    ID: number;
    Name: string;

    ParentID?: number;
    ParentName?: string;
    IsActive: boolean;
    Address1?: string;
    Address2?: string;
    Address3?: string;
    Address4?: string;
    City?: string;
    StateName?: string;
    StateAbbr?: string;
    PostalCode?: string;
    Country?: string;
    Phone?: string;
    Fax?: string;
    Url?: string;
    Notes?: string;
    CreatedDate: DateTime;
    ModifiedDate: DateTime;
    Code?: string;
    IndustryID: number;
    IndustryName?: string;
    ManagerUID: string;
    ManagerFullName: string;
    Attributes?: CustomAttribute[];
}