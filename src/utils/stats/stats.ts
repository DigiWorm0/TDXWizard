import BuddyStats from "../../types/BuddyStats";
import { GM_setValue, GM_getValue } from "$";

const DEFAULT_STATS: BuddyStats = {
    ticketCount: 0
}

export function setStats(stats: BuddyStats) {
    GM_setValue("stats", JSON.stringify(stats));
}

export function getStats(): BuddyStats {
    // Get Stats
    const stats = GM_getValue("stats") as string | undefined;
    if (!stats)
        return DEFAULT_STATS;

    // Parse Stats
    return JSON.parse(stats) as BuddyStats;
}