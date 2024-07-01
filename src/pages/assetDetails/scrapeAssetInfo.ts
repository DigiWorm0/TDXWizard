import getAssetIDFromURL from "../../utils/tdx/getAssetIDFromURL";
import AssetInfo from "../../types/AssetInfo";

/**
 * Scrape asset information from the asset details page
 * @returns The asset information
 */
export default function scrapeAssetInfo() {
    const id = getAssetIDFromURL();
    if (!id)
        throw new Error("Could not get asset ID from URL.");

    const serialNumber = document.getElementById("divSerialNumber")?.innerText.split("\n")[1] ?? "";
    const assetTag = document.getElementById("divAssetTag")?.innerText.split("\n")[1] ?? "";
    const owningDepartment = document.getElementById("divOwningDept")?.innerText.split("\n")[1] ?? "";
    const status = document.getElementById("adtAsset_lblStatus")?.innerText ?? "";
    const owner = document.querySelector<HTMLSpanElement>("span.media-heading")?.innerText ?? "";

    const assetInfo: AssetInfo = {
        id,
        serialNumber,
        assetTag,
        status,
        owningDepartment,
        owner
    };
    console.log("Asset Info: ", assetInfo);
    return assetInfo;
}