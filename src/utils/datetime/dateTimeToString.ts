import DateTime from "../../tdx-api/types/DateTime";

/**
 * Converts a DateTime object to a human-readable string timestamp.
 * @param date - The DateTime object to convert.
 * @return A string representing the date and time in the local format.
 */
export default function dateTimeToString(date: DateTime): string {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}