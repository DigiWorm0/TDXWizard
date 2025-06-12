import {SurplusAsset} from "./SurplusManagerModal";
import AssetLink from "../../buttons/TDX/AssetLink";
import AppID from "../../../types/AppID";
import TicketLink from "../../buttons/TDX/TicketLink";
import Ticket from "../../../tdx-api/types/Ticket";

export interface SurplusManagerTableRowProps {
    asset: SurplusAsset;
    onRemove: () => void;
    disabled?: boolean;
}

const SURPLUS_STATUS_ID = 27; // Surplus Status ID
// const SURPLUS_DEPARTMENT_ID = 3484; // Surplus Department ID
const PICKED_UP_ATTRIBUTE_ID = 14087;
const PICKED_UP_YES_VALUE = "41587"; // Yes Value for Picked Up Attribute

const getSurplusTicketPickedUp = (ticket: Ticket): boolean => {
    const pickedUpAttribute = ticket.Attributes?.find(attr => attr.ID === PICKED_UP_ATTRIBUTE_ID);
    return pickedUpAttribute?.Value === PICKED_UP_YES_VALUE;
}

export default function SurplusManagerTableRow(props: SurplusManagerTableRowProps) {
    const {asset} = props;
    const isSurplusInventory = asset.StatusID === SURPLUS_STATUS_ID;

    return (
        <tr key={asset.ID}>
            <td>
                <AssetLink id={asset.ID} appID={AppID.Inventory}>
                    {asset.Tag}
                </AssetLink>
            </td>
            <td>
                <AssetLink id={asset.ID} appID={AppID.Inventory}>
                    {asset.SerialNumber}
                </AssetLink>
            </td>
            <td>
                {asset.ManufacturerName} {asset.ProductModelName}
            </td>
            <td>
                <span className={`badge bg-${isSurplusInventory ? "success" : "secondary"}`}>
                    {asset.StatusName}
                </span>
            </td>
            <td>
                {asset.surplusTickets.map((ticket) => (
                    <TicketLink id={ticket.ID} appID={AppID.Tickets} key={ticket.ID}>
                        {ticket.ID} - {getSurplusTicketPickedUp(ticket) ? "Picked Up" : "Pending"}
                    </TicketLink>
                ))}

                {asset.surplusTickets.length === 0 && (
                    <span className={"badge bg-secondary"}>
                        No Ticket
                    </span>
                )}
            </td>
            <td>
                <button
                    className={"btn btn-danger btn-sm"}
                    onClick={props.onRemove}
                    title={"Remove Asset"}
                    disabled={props.disabled}
                >
                    <span className={"fa fa-trash fa-nopad"}/>
                </button>
            </td>
        </tr>
    );
}