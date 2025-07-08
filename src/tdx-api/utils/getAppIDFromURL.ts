/**
 * Get the AppID from the URL
 * @param document - The document to get the URL from if not using the global window.document
 * @returns The AppID or null if not found
 */
export default function getAppIDFromURL(document: Document = window.document): number | null {
    const url = new URL(document.location.href);
    const regex = /\/Apps\/(\d+)/; // /Apps/1234
    const match = url.pathname.match(regex);

    // If the match is null, return null
    if (match === null)
        return null;

    // Return the AppID
    return parseInt(match[1]);
}