export default function getTicketIDFromURL(): string | null {
    const url = new URL(window.location.href);
    return url.searchParams.get("TicketID");
}