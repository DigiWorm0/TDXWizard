import { getStats } from "./stats";

/**
 * Shows the current stats as a dialog popup
 */
export default function showStats() {
    const stats = getStats();
    alert(`Ticket Count: ${stats.ticketCount}`)
}