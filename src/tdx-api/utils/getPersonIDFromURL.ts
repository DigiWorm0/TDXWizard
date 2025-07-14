/**
 * Get the Person UID from the URL
 * @param document - The document to get the URL from if not using the global window.document
 * @returns The Person UID or null if not found
 */
export default function getPersonIDFromURL(document: Document = window.document): string {
    const url = new URL(document.location.href);
    return url.searchParams.get("U") || "";
}