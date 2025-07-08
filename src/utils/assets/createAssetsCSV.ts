import Asset from "../../tdx-api/types/Asset";

/**
 * Creates a CSV file from an array of Asset objects and triggers a download.
 * @param assets - An array of Asset objects to be exported as CSV.
 */
export default function createAssetsCSV(assets: Asset[]) {
    if (assets.length === 0)
        throw new Error("No assets to export");

    // Create Header
    const keys = Object.keys(assets[0]).sort() as (keyof Asset)[];
    const header = keys.join(",") + "\n";

    // TODO: Drop keys that are not needed

    // Create Body
    const body = assets.map(asset => keys.map(key => asset[key]).join(",")).join("\n");

    // Create Blob
    const blob = new Blob([header + body], {type: "text/csv"});
    const url = URL.createObjectURL(blob);

    // Create Link
    const link = document.createElement("a");
    link.href = url;
    link.download = "BulkInventory.csv";
    link.click();

    // Revoke URL
    URL.revokeObjectURL(url);
}