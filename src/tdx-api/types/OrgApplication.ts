export default interface OrgApplication {
    AppID: number;
    Name: string;
    Description?: string;
    Type: string;
    AppClass: string;
    ExternalUrl?: string;
    Purpose?: string;
    Active: boolean;
    PartialUrl?: string;
}