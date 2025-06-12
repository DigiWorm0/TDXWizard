import confirmAction from "../../utils/confirmAction";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import getAppIDFromURL from "../../utils/tdx/getAppIDFromURL";
import Asset from "../../tdx-api/types/Asset";

const SURPLUS_STATUS_ID = 27; // Surplus Status ID
const SURPLUS_DEPARTMENT_ID = 3484; // Surplus Department ID

export interface SurplusAssetsButtonProps {
    assets: Asset[];
    disabled?: boolean;
    onClick?: () => void;
    onError?: (error: string) => void;
}

export default function SurplusAssetsButton(props: SurplusAssetsButtonProps) {
    const onClick = async () => {
        if (confirmAction("Mark these assets as surplus?")) {
            const client = new UWStoutTDXClient();

            // Get App ID
            const appID = getAppIDFromURL();
            if (!appID)
                throw new Error("AppID not found");

            // Update Asset
            for (const asset of props.assets) {
                await client.assets.editAsset(appID, asset.ID, {
                    ...asset,
                    StatusID: SURPLUS_STATUS_ID,
                    OwningDepartmentID: SURPLUS_DEPARTMENT_ID,
                    OwningCustomerID: ""
                });
            }

            // Callback
            if (props.onClick)
                props.onClick();
        }
    }


    return (
        <button
            type={"button"}
            className={"tdx-btn tdx-btn--secondary"}
            style={{marginTop: 5, marginLeft: 5}}
            disabled={props.disabled}
            title={"Surplus Asset"}
            onClick={() => onClick().catch(error => props.onError ? props.onError(error.message) : console.error(error))}
        >
            <i className={"fa fa-archive"}></i>
            <span className={"hidden-xs padding-left-xs"}>Set Inventory to Surplus</span>
        </button>
    )
}