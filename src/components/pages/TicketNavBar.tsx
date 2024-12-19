import TicketTypeButtons from "../buttons/TicketTypeButtons";
import TicketAssignmentButtons from "../buttons/TicketAssignmentButtons";
import TicketPrintButton from "../buttons/TicketPrintButton";
import TicketAssetButtons from "../buttons/TicketAssetButtons";
import ConvertSurplusTicketButton from "../buttons/ConvertSurplusTicketButton";
import EStoutPickupButton from "../buttons/EStoutPickupButton";
import ResolveButton from "../buttons/ResolveButton";

export default function TicketNavBar() {
    return (
        <>
            <TicketPrintButton/>
            <TicketTypeButtons/>
            <TicketAssetButtons/>
            <TicketAssignmentButtons/>
            <ConvertSurplusTicketButton/>
            <EStoutPickupButton/>
            <ResolveButton/>
        </>
    )
}