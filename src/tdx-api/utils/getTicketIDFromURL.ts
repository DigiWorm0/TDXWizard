/**
 * Get the TicketID from the URL
 * @param document - The document to get the URL from if not using the global window.document
 * @returns The TicketID or null if not found
 */
export default function getTicketIDFromURL(document: Document = window.document): number | null {
    const url = new URL(document.location.href);
    return parseInt(url.searchParams.get("TicketID") || "") || null;
}