import toast from "react-hot-toast";
import HTTPResponseError from "./HTTPResponseError";
import autoUpdateAuthKey from "./autoUpdateAuthKey";

// Only allow one auto-update of the auth key per page load
let didUpdateAuthKey = false;

/**
 * Handles errors by logging them to the console and displaying a toast notification.
 * @param error - The error object or message to log.
 * @param message - The error message to display (Ex: "Error loading data").
 */
export default function handleError(message: string, error: unknown) {

    // Log the error to the console
    console.error(message, error);

    // Convert the error to a string for display
    let errorText = String(error);
    if (error instanceof HTTPResponseError)
        errorText = `HTTP ${error.response.status} (${error.response.statusText})`;
    else if (error instanceof Error)
        errorText = error.message;

    // Toast the error message
    toast.error(`${message}: ${errorText}`);

    // If this is an error 401, check if the user isn't logged in
    if (error instanceof HTTPResponseError &&
        error.response.status === 401 &&
        !didUpdateAuthKey) {

        // Automatically update the auth key if it is expired
        autoUpdateAuthKey().catch(console.error);

        // Set the flag to prevent multiple updates
        didUpdateAuthKey = true;
    }

    return null;
}