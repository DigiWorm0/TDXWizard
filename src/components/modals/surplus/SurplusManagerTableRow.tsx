import {SurplusAsset} from "./SurplusManagerModal";
import AssetLink from "../../buttons/TDX/AssetLink";
import AppID from "../../../types/AppID";
import SurplusTicketTag from "./SurplusTicketTag";

export interface SurplusManagerTableRowProps {
    asset: SurplusAsset;
    onRemove: () => void;
    disabled?: boolean;
}

const SURPLUS_STATUS_ID = 27; // Surplus Status ID

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
                    <SurplusTicketTag
                        key={ticket.ID}
                        ticket={ticket}
                    />
                ))}

                {asset.surplusTickets.length === 0 && (
                    <span
                        title={"No associated surplus ticket"}
                        className={"badge bg-secondary"}
                    >
                        <span className={"fa fa-ban me-1"}/>
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