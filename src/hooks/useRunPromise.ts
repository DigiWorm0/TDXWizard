import React from "react";

export default function useRunPromise(onError: (err: string) => void) {
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
            // Handle the error by calling the onError callback
            const errorMessage = err.message || "An error occurred while processing the request.";
            onError(errorMessage);
            return null;
        } finally {
            // Reset the loading state
            setIsLoading(false);
        }
    }, [onError]);

    return [runPromise, isLoading] as const;
}