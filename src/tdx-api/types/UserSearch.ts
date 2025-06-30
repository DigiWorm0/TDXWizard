export default interface UserSearch {
    SearchText?: string;
    IsActive?: boolean;
    IsEmployee?: boolean;
    AppName?: string;
    AccountIDs?: number[];
    MaxResults?: number;
    ReferenceIDs?: number[];
    ExternalID?: string;
    AlternateID?: string;
    UserName?: string;
    PhoneNumber?: string;
    SecurityRoleID?: string;
    IsConfidential?: boolean;
}