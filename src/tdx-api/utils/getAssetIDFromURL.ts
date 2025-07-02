/**
 * Get the AssetID from the URL
 * @returns The AssetID or null if not found
 */
export default function getAssetIDFromURL(): number | null {
    const url = new URL(window.location.href);
    return parseInt(url.searchParams.get("AssetID") || "") || null;
}