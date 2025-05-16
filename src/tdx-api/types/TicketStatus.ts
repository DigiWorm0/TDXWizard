import StatusClass from "./StatusClass";

export default interface TicketStatus {
    ID: number;
    AppID: number;
    AppName: string;
    Name: string;
    Description?: string;
    Order: number;
    StatusClass: StatusClass;
    IsActive: boolean;
    RequireGoesOffHold: boolean;
    DoNotReopen: boolean;
    IsDefault: boolean;
}