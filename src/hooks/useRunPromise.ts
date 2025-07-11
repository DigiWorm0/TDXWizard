import React from "react";
import handleError from "../utils/handleError";

export default function useRunPromise() {
    const [isLoading, setIsLoading] = React.useState(false);

    // Function to run a promise and handle its state
    const runPromise = React.useCallback(async <T>(promise: Promise<T>): Promise<T | null> => {

        // Check if the promise is already running
        if (isLoading) {
            console.warn("Promise is already running. Ignoring new request.");
            return null;
        }

        // Start the loading state
        setIsLoading(true);
        try {
            // Run the promise and wait for it to resolve
            return await promise;
        } catch (err: any) {
            return handleError("Error running promise", err);
        } finally {
            // Reset the loading state
            setIsLoading(false);
        }
    }, []);

    return [runPromise, isLoading] as const;
}