import TicketLink from "../../common/TDX/TicketLink";
import Ticket from "../../../tdx-api/types/Ticket";
import StatusClass from "../../../tdx-api/types/StatusClass";
import UWStoutAppID from "../../../types/UWStoutAppID";

const PICKED_UP_ATTRIBUTE_ID = 14087;
const PICKED_UP_YES_VALUE = "41587"; // Yes Value for Picked Up Attribute

export interface SurplusTicketTagProps {
    ticket: Ticket;
}

enum SurplusStatus {
    New,
    PickedUp,
    Resolved
}

const SurplusStatusIntent = {
    [SurplusStatus.New]: "danger",
    [SurplusStatus.PickedUp]: "success",
    [SurplusStatus.Resolved]: "primary"
}

const SurplusStatusIcon = {
    [SurplusStatus.New]: "fa fa-sm fa-xmark",
    [SurplusStatus.PickedUp]: "fa fa-check",
    [SurplusStatus.Resolved]: "fa fa-flag-checkered"
}

const SurplusStatusText = {
    [SurplusStatus.New]: "Not Picked Up",
    [SurplusStatus.PickedUp]: "In PC-Repair",
    [SurplusStatus.Resolved]: "Resolved"
}

export default function SurplusTicketTag(props: SurplusTicketTagProps) {
    const {ticket} = props;

    // Get Ticket Attributes
    const pickedUpAttribute = ticket.Attributes?.find(attr => attr.ID === PICKED_UP_ATTRIBUTE_ID);
    const isPickedUp = pickedUpAttribute?.Value === PICKED_UP_YES_VALUE;
    const isResolved = ticket.StatusClass === StatusClass.Cancelled ||
        ticket.StatusClass === StatusClass.Completed;

    // Determine Ticket Status
    const status = isResolved ? SurplusStatus.Resolved : isPickedUp ? SurplusStatus.PickedUp : SurplusStatus.New;
    const intent = SurplusStatusIntent[status];
    const icon = SurplusStatusIcon[status];
    const text = SurplusStatusText[status];

    return (

        <span
            className={`badge bg-${intent}`}
            style={{margin: 2}}
            title={text}
        >
                <TicketLink
                    id={ticket.ID}
                    appID={UWStoutAppID.Tickets}
                    anchorProps={{
                        style: {
                            color: "inherit",
                            textDecoration: "none"
                        }
                    }}
                >
                    <span className={`${icon} me-1`}/>

                    {ticket.ID}
                </TicketLink>
            </span>
    )
}
