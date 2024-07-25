import CustomAttribute from "./CustomAttribute";

export default interface AccountSearch {
    SearchText?: string;
    ManagerUids?: string[];
    CustomAttributes?: CustomAttribute[];
    IsActive?: boolean;
    MaxResults?: number;
    ParentAccountID?: number;
    ParentAccountName?: string;
}