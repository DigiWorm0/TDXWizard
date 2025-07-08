import toast from "react-hot-toast";
import HTTPResponseError from "./HTTPResponseError";
import autoUpdateAuthKey from "./autoUpdateAuthKey";

/**
 * Handles errors by logging them to the console and displaying a toast notification.
 * @param error - The error object or message to log.
 * @param message - The error message to display (Ex: "Error loading data").
 */
export default function handleError(message: string, error: unknown) {
    console.error(message, error);
    const errorText = error instanceof Error ? error.message : String(error);
    toast.error(`${message}: ${errorText}`, {
        duration: 5000
    });

    // If this is an error 401, check if the user isn't logged in
    if (error instanceof HTTPResponseError && error.response.status === 401)
        autoUpdateAuthKey().catch(console.error);

    return null;
}