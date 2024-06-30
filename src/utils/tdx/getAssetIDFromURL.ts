/**
 * Get the AssetID from the URL
 * @returns The AssetID or null if not found
 */
export default function getAssetIDFromURL(): string | null {
    const url = new URL(window.location.href);
    return url.searchParams.get("AssetID");
}