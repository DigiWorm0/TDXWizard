import HTTPResponseError from "./HTTPResponseError";

/**
 * Automatically retries an HTTP request if the response is a 429 Too Many Requests error (Rate Limit Exceeded)
 * @param promise - Callback that returns a promise to execute
 * @param retryDelay - The delay between retries in milliseconds
 * @param maxRetries - The maximum number of retries. -1 for infinite retries
 * @param onRetry - A callback to execute on each retry
 */
export default async function autoRetryHTTPRequest<T>(
    promise: () => Promise<T>,
    retryDelay: number,
    maxRetries: number,
    onRetry?: (retries: number) => void
) {
    let retries = 0;
    while (true) {
        try {
            return await promise();
        } catch (err) {
            if (retries >= maxRetries && maxRetries !== -1)
                throw err;
            if (!(err instanceof HTTPResponseError))
                throw err;
            if (err.response.status !== 429)
                throw err;

            // Handle Retry
            retries++;
            if (onRetry)
                onRetry(retries);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
}