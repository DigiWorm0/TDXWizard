import {atomFamily, unwrap} from "jotai/utils";
import Guid from "../tdx-api/types/Guid";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import {useAtomValue} from "jotai";
import DefaultGUID from "../types/DefaultGUID";
import atomWithCache from "../utils/atomWithCache";
import handleError from "../utils/handleError";

export const userAtomFamily = atomFamily((uid?: Guid) => {
    const userAtom = atomWithCache(`user-${uid}`, async () => {
        if (!uid)
            return null;
        if (uid === DefaultGUID)
            return null;

        // API Client
        const client = new LocalTDXClient();
        return await client.people.getPerson(uid ?? "")
            .catch(e => handleError("Error fetching user", e));
    }, {
        cacheTime: 1000 * 60 * 30 // 30 minutes
    });

    // Unwrap the atom
    // Returns null while loading
    return unwrap(userAtom, p => p);
});

/**
 * Hook to get a user from the TDX API.
 * Returns undefined while loading.
 * Returns null if the user does not exist.
 * @param uid
 */
export default function useUser(uid?: Guid) {
    return useAtomValue(userAtomFamily(uid));
}