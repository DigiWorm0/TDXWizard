/**
 * Get the TicketID from the URL
 * @returns The TicketID or null if not found
 */
export default function getTicketIDFromURL(): string | null {
    const url = new URL(window.location.href);
    return url.searchParams.get("TicketID");
}