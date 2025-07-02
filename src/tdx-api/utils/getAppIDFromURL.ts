/**
 * Get the AppID from the URL
 * @returns The AppID or null if not found
 */
export default function getAppIDFromURL(): number | null {
    const url = new URL(window.location.href);
    const regex = /\/Apps\/(\d+)/; // /Apps/1234
    const match = url.pathname.match(regex);

    // If the match is null, return null
    if (match === null)
        return null;

    // Return the AppID
    return parseInt(match[1]);
}