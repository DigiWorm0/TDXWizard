import AssetLink from "../../common/TDX/AssetLink";
import UserLink from "../../common/TDX/UserLink";
import DepartmentLink from "../../common/TDX/DepartmentLink";
import Asset from "../../../tdx-api/types/Asset";

export interface BulkInventoryAssetRowProps {
    asset: Asset;
    removeAsset: (asset: Asset) => void;
    appID?: number;
}

export default function BulkInventoryAssetRow(props: BulkInventoryAssetRowProps) {
    const {asset, removeAsset} = props;

    return (
        <tr key={asset.ID}>
            <td><AssetLink id={asset.ID} appID={props.appID}>{asset.Tag}</AssetLink></td>
            <td><AssetLink id={asset.ID} appID={props.appID}>{asset.SerialNumber}</AssetLink></td>
            <td>
                {asset.ManufacturerName} {asset.ProductModelName}
            </td>
            <td>
                {asset.OwningCustomerName !== "None" ?
                    <UserLink id={asset.OwningCustomerID}>
                        {asset.OwningCustomerName}
                    </UserLink>
                    :
                    <DepartmentLink id={asset.OwningDepartmentID}>
                        {asset.OwningDepartmentName}
                    </DepartmentLink>
                }
            </td>
            <td>
                {asset.StatusName}
            </td>
            <td className={"text-center"}>
                <button
                    className={"btn btn-danger btn-sm"}
                    onClick={() => removeAsset(asset)}
                    title={"Remove Asset"}
                >
                    <span className={"fa fa-trash fa-nopad"}/>
                </button>
            </td>
        </tr>
    )
}