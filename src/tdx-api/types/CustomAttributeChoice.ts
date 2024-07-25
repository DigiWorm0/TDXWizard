import DateTime from "./DateTime";

export default interface CustomAttributeChoice {
    ID: number;
    Name: string;
    IsActive: boolean;
    DateCreated?: DateTime;
    DateModified?: DateTime;
    Order: number;
}