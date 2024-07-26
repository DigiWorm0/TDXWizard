import DateTime from "../../tdx-api/types/DateTime";

export default function getDateAgo(date: DateTime): string {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 1)
        return months + " months ago";
    if (days > 1)
        return days + " days ago";
    if (hours > 1)
        return hours + " hours ago";
    if (minutes > 1)
        return minutes + " minutes ago";
    if (seconds > 1)
        return seconds + " seconds ago";
    return "just now";
}