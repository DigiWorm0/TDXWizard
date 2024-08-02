import {atomFamily, unwrap} from "jotai/utils";
import Guid from "../tdx-api/types/Guid";
import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import {useAtomValue} from "jotai";
import DefaultGUID from "../types/DefaultGUID";
import atomWithCache from "../utils/atomWithCache";

export const userAtomFamily = atomFamily((uid: Guid) => {
    const userAtom = atomWithCache(`user-${uid}`, async () => {
        if (!uid)
            return null;
        if (uid === DefaultGUID)
            return null;

        try {
            console.log(`Fetching user ${uid}`);
            const client = new UWStoutTDXClient();
            return await client.people.getPerson(uid ?? "");
        } catch (e) {
            console.error(e);
            return null;
        }
    }, {
        cacheTime: 1000 * 60 * 5 // 5 minutes
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
export default function useUser(uid: Guid) {
    return useAtomValue(userAtomFamily(uid));
}