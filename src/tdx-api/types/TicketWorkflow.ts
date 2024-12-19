import Guid from "./Guid";
import DateTime from "./DateTime";

export default interface TicketWorkflow {
    ID: number;
    Name: string;
    Description: string;
    TicketId: number;
    WorkflowConfigurationID: number;
    BeginStepID: Guid;
    CurrentStepIDs: Guid[];
    //Steps
    //Status
    IsComplete: boolean;
    CreatedDateUtc: DateTime;
    StartDateUtc: DateTime;
    CompletedDateUtc: DateTime;
    FinalApprovalStepID: Guid;
    FinalRejectionStepID: Guid;
    //History
    NotifyRequestor: boolean;
    NotifyReviewer: boolean;
}