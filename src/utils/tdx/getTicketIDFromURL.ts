/**
 * Get the TicketID from the URL
 * @returns The TicketID or null if not found
 */
export default function getTicketIDFromURL(document: Document = window.document): string | null {
    const url = new URL(document.location.href);
    return url.searchParams.get("TicketID");
}