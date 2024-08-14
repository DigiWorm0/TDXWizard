import TicketTypeButtons from "../buttons/TicketTypeButtons";
import TicketAssignmentButtons from "../buttons/TicketAssignmentButtons";
import TicketPrintButton from "../buttons/TicketPrintButton";

export default function TicketNavBar() {
    return (
        <>
            <TicketPrintButton/>
            <TicketTypeButtons/>
            <TicketAssignmentButtons/>
        </>
    )
}