import getAssetIDFromURL from "./getAssetIDFromURL";
import AssetInfo from "../../types/AssetInfo";
import selectDropdownItem from "../ui/selectDropdownItem";
import selectSearchItem from "../ui/selectSearchItem";
import waitFor from "../waitFor";
import getSettings from "../../hooks/settings/getSettings";

/**
 * Update an asset in TDX. Note: Not all fields are supported
 * @param asset - The asset to update. Include the ID to specify a different asset
 */
export default async function updateAsset(asset: Partial<AssetInfo>) {

    // Get the asset ID
    const _assetID = asset.id ?? getAssetIDFromURL();
    if (!_assetID)
        throw new Error("Asset ID not found");

    // Open the asset update page as a popup
    const assetURL = `/TDNext/Apps/44/Assets/Update?AssetID=${_assetID}`;
    const assetPage = window.open(assetURL, "assetPage", "width=800,height=600");
    if (!assetPage)
        throw new Error("Could not open asset page");

    // Wait for the asset page to load
    await new Promise(resolve => assetPage.onload = resolve);

    // Select the asset values
    selectDropdownItem("NewStatusId", asset.status, assetPage.document);
    await selectSearchItem("NewOwnerUid", asset.owner, assetPage.document);
    await selectSearchItem("NewOwningDeptId", asset.owningDepartment, assetPage.document);

    // Save Changes
    const saveButton = assetPage.document.getElementById("btnSubmit");
    if (!saveButton)
        throw new Error("Save button not found");
    saveButton.click();
    await waitFor(1000);

    // Close the asset page
    assetPage.close();

    // Refresh/close the current page
    const settings = getSettings();
    if (settings.autoCloseTicketOnSave)
        window.close();
    else
        window.location.reload();
}