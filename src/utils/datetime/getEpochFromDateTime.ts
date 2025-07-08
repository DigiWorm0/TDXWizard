import DateTime from "../../tdx-api/types/DateTime";

/**
 * Converts a DateTime object to an epoch timestamp in milliseconds.
 * @param date - The DateTime object to convert.
 * @return The UTC epoch timestamp in milliseconds.
 */
export default function getEpochFromDateTime(date: DateTime): number {
    return (new Date(date)).getTime();
}