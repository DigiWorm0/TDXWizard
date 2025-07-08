import DateTime from "../../tdx-api/types/DateTime";

/**
 * Converts a JavaScript Date object to a TDX DateTime string.
 * @param date - The Date object to convert.
 * @return A DateTime string in ISO format.
 */
export default function dateToDateTime(date: Date): DateTime {
    // Convert the Date object to a DateTime string in ISO format
    const dateTimeString = date.toISOString();

    // Return the DateTime string as a DateTime type
    return dateTimeString as DateTime;
}