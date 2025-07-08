import TicketTypeButtons from "./TicketTypeButtons";
import TicketAssignmentButtons from "./TicketAssignmentButtons";
import TicketPrintButton from "./TicketPrintButton";
import TicketAssetButtons from "./TicketAssetButtons";
import TicketSurplusConversionButton from "./TicketSurplusConversionButton";
import TicketResolveButton from "./TicketResolveButton";
import TicketUpdateButton from "./TicketUpdateButton";

export default function TicketNavBar() {
    return (
        <>
            <TicketUpdateButton/>
            <TicketPrintButton/>
            <TicketTypeButtons/>
            <TicketAssetButtons/>
            <TicketAssignmentButtons/>
            <TicketSurplusConversionButton/>
            <TicketResolveButton/>
        </>
    )
}