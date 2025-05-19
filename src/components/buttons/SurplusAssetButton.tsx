import confirmAction from "../../utils/confirmAction";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import useSettings from "../../hooks/useSettings";
import useAsset from "../../hooks/useAsset";
import getAppIDFromURL from "../../utils/tdx/getAppIDFromURL";

export default function SurplusAssetButton() {
    const [settings] = useSettings();
    const asset = useAsset();

    const onClick = async () => {
        if (confirmAction("Mark this asset as surplus?")) {
            const client = new UWStoutTDXClient();

            // Get App ID
            const appID = getAppIDFromURL();
            if (!appID)
                throw new Error("AppID not found");

            // Get Asset Info
            if (!asset)
                throw new Error("Asset not found");

            // Update Asset
            await client.assets.editAsset(appID, asset.ID, {
                ...asset,
                StatusID: 27,
                OwningDepartmentID: 3484,
                OwningCustomerID: ""
            });

            // Refresh/Close Page
            if (settings.autoCloseTicketOnSave)
                window.close();
            else
                window.location.reload();
        }
    }

    if (asset?.StatusID === 27 || !settings.showSurplusButtons)
        return null;
    return (
        <button
            type={"button"}
            className={"btn btn-secondary btn-sm"}
            style={{margin: "0px 3px"}}
            title={"Surplus Asset"}
            onClick={onClick}
        >
            <span className={"fa fa-solid fa-recycle fa-nopad"}/>
            <span className={"hidden-xs padding-left-xs"}>Surplus Asset</span>
        </button>
    )
}