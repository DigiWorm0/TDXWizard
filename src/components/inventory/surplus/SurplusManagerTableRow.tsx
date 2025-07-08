import {SurplusAsset} from "./SurplusManagerModal";
import AssetLink from "../../common/TDX/AssetLink";
import SurplusTicketTag from "./SurplusTicketTag";
import useRunPromise from "../../../hooks/useRunPromise";
import UWStoutAppID from "../../../types/UWStoutAppID";

export interface SurplusManagerTableRowProps {
    asset: SurplusAsset;
    onRemove: () => void;
    onRefresh: () => Promise<unknown>;
    onMakeTicket: () => void;
    disabled?: boolean;
}

const SURPLUS_STATUS_ID = 27; // Surplus Status ID

export default function SurplusManagerTableRow(props: SurplusManagerTableRowProps) {
    const {asset} = props;
    const isSurplusInventory = asset.StatusID === SURPLUS_STATUS_ID;
    const [runPromise, isLoading] = useRunPromise();

    if (isLoading)
        return (
            <tr>
                <td
                    colSpan={6}
                    className={"text-center"}
                >
                    <span className={"fa fa-spinner fa-spin"}/> Loading...
                </td>
            </tr>
        )

    return (
        <tr>
            <td>
                <AssetLink id={asset.ID} appID={UWStoutAppID.Inventory}>
                    {asset.Tag}
                </AssetLink>
            </td>
            <td>
                <AssetLink id={asset.ID} appID={UWStoutAppID.Inventory}>
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
                        style={{margin: 2}}
                    >
                        <span className={"fa fa-ban me-1"}/>
                        No Ticket
                    </span>
                )}

                {/*<span*/}
                {/*    className={"badge bg-danger"}*/}
                {/*    title={"Create Surplus Ticket"}*/}
                {/*    style={{*/}
                {/*        cursor: props.disabled ? "not-allowed" : "pointer",*/}
                {/*        margin: 2*/}
                {/*    }}*/}
                {/*    onClick={props.disabled ? undefined : props.onMakeTicket}*/}
                {/*>*/}
                {/*    <span className={"fa fa-plus"}/>*/}
                {/*</span>*/}
            </td>
            <td>
                <button
                    className={"btn btn-secondary btn-sm"}
                    style={{margin: 2}}
                    onClick={() => runPromise(props.onRefresh())}
                    title={"Refresh Asset"}
                    disabled={props.disabled}
                >
                    <span className={"fa fa-sync fa-nopad"}/>
                </button>
                <button
                    className={"btn btn-danger btn-sm"}
                    style={{margin: 2}}
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