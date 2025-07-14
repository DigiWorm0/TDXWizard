import {useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import atomWithCache from "../utils/atomWithCache";
import handleError from "../utils/handleError";
import {myUserHasApplication} from "./useMyUserHasApplication";

export const groupsAtom = atomWithCache("groups", async (get) => {
    // API Client
    const client = new LocalTDXClient();

    // Check if the user has access to TDPeople
    if (!get(myUserHasApplication("TDPeople")))
        return null;

    // Get all applications
    return await client.groups
        .search({IsActive: true})
        .catch((e) => handleError("Error fetching TDX groups", e));
}, {
    cacheTime: 1000 * 60 * 5 // 5 minutes
});

export const syncGroupsAtom = unwrap(groupsAtom, t => t);

export default function useGroups() {
    return useAtomValue(syncGroupsAtom);
}