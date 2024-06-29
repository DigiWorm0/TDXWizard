import { getStats, setStats } from "./stats";

export default function incrementTicketCount() {
    const currentStats = getStats();

    setStats({
        ...currentStats,
        ticketCount: currentStats.ticketCount + 1,
    });
}