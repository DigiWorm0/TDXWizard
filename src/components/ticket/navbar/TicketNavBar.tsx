import TicketTypeButtons from "./TicketTypeButtons";
import TicketAssignmentButtons from "./TicketAssignmentButtons";
import TicketPrintButton from "./TicketPrintButton";
import TicketAssetButtons from "./TicketAssetButtons";
import TicketSurplusConversionButton from "./TicketSurplusConversionButton";
import TicketResolveButton from "./TicketResolveButton";
import TicketUpdateButton from "./TicketUpdateButton";
import TicketDebugInfoButton from "./TicketDebugInfoButton";
import TicketWorkflowButton from "./TicketWorkflowButton";

export default function TicketNavBar() {
    return (
        <>
            <TicketUpdateButton/>
            <TicketPrintButton/>
            <TicketTypeButtons/>
            <TicketAssetButtons/>
            <TicketAssignmentButtons/>
            <TicketSurplusConversionButton/>
            <TicketWorkflowButton/>
            <TicketResolveButton/>
            <TicketDebugInfoButton/>
        </>
    )
}