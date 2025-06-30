import {atom, Getter} from "jotai";

export interface AtomWithCacheOptions {
    /**
     * The time in milliseconds to cache the value for
     */
    cacheTime?: number;
}

export interface CachedStorageObject<T> {
    /**
     * The value of the atom
     */
    value: T | undefined | null;

    /**
     * The time the atom was last updated
     */
    lastUpdated: number;
}

/**
 * The maximum number of cache keys to store
 */
const MAX_CACHE_KEYS = 100;

/**
 * Creates an async Jotai Atom that caches its value into localStorage.
 * @param key The key to store the value in localStorage
 * @param getValue The function to get the value from the server
 * @param options Options for the atom
 * @returns The atom
 */
export default function atomWithCache<T>(
    key: string,
    getValue: (get: Getter) => Promise<T>,
    options?: AtomWithCacheOptions
) {
    return atom(async (get) => {

        // Update the cache key list
        const updateCacheList = (key: string) => {

            // Get the key list
            const keys = localStorage.getItem("_cachekeys") ?? "[]";
            let keyList = JSON.parse(keys) as string[];

            // Add the key to the front of the list
            keyList = keyList.filter(k => k !== key);
            keyList.unshift(key);

            // Remove keys if we have too many
            while (keyList.length > MAX_CACHE_KEYS && MAX_CACHE_KEYS > 0)
                localStorage.removeItem(keyList.pop() as string);

            // Save the key list
            localStorage.setItem("_cachekeys", JSON.stringify(keyList));
        }

        // Cache miss function
        const updateCache = async () => {

            // Grab the new value
            const newValue = {
                value: await getValue(get),
                lastUpdated: Date.now()
            };

            // Update the localStorage
            localStorage.setItem(key, JSON.stringify(newValue));

            // Update the key list w/ the new key
            updateCacheList(key);

            // Return the new value
            return newValue.value;
        }

        // Get Current Value
        const storageJSON = localStorage.getItem(key);
        if (!storageJSON)
            return await updateCache();

        // Parse the value
        const storageValue = JSON.parse(storageJSON) as CachedStorageObject<T>;

        // Check if the value is expired
        const cacheTime = options?.cacheTime ?? 0;
        if (Date.now() - storageValue.lastUpdated > cacheTime)
            return await updateCache();

        // Check if the value is undefined
        if (storageValue.value === undefined ||
            storageValue.value === null)
            return await updateCache();

        // Return the value
        return storageValue.value;
    });
}

/**
 * Clears the entire localStorage cache
 */
export function clearCache() {

    // Get all keys
    const keys = localStorage.getItem("_cachekeys") ?? "[]";
    const keyList = JSON.parse(keys) as string[];

    // Remove all keys
    for (const key of keyList)
        localStorage.removeItem(key);

    // Remove the key list
    localStorage.removeItem("_cachekeys");
}