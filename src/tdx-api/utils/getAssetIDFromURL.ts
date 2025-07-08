/**
 * Get the AssetID from the URL
 * @param document - The document to get the URL from if not using the global window.document
 * @returns The AssetID or null if not found
 */
export default function getAssetIDFromURL(document: Document = window.document): number | null {
    const url = new URL(document.location.href);
    return parseInt(url.searchParams.get("AssetID") || "") || null;
}