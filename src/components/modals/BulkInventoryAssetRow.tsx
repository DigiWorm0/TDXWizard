import AssetLink from "../buttons/TDX/AssetLink";
import UserLink from "../buttons/TDX/UserLink";
import DepartmentLink from "../buttons/TDX/DepartmentLink";
import Asset from "../../tdx-api/types/Asset";

export interface BulkInventoryAssetRowProps {
    asset: Asset;
    removeAsset: (asset: Asset) => void;
}

export default function BulkInventoryAssetRow(props: BulkInventoryAssetRowProps) {
    const {asset, removeAsset} = props;

    return (
        <tr key={asset.ID}>
            <td><AssetLink id={asset.ID}>{asset.Tag}</AssetLink></td>
            <td><AssetLink id={asset.ID}>{asset.SerialNumber}</AssetLink></td>
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
                    {/* FontAwesome breaks inside Shadow DOM */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
                        />
                    </svg>
                </button>
            </td>
        </tr>
    )
}