/**
 * Get the TicketID from the URL
 * @returns The TicketID or null if not found
 */
export default function getTicketIDFromURL(document: Document = window.document): number | null {
    const url = new URL(document.location.href);
    return parseInt(url.searchParams.get("TicketID") || "") || null;
}