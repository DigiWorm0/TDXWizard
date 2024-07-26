import DateTime from "../../tdx-api/types/DateTime";

export default function dateToString(date: DateTime): string {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}