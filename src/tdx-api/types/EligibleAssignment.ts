export default interface EligibleAssignment {
    Name: string;
    // ID of the user or group
    Value: string;
    Email?: string;
    IsUser: boolean;
}