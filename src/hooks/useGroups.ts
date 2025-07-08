import {useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import atomWithCache from "../utils/atomWithCache";
import handleError from "../utils/handleError";

export const groupsAtom = atomWithCache("groups", () => {
    // API Client
    const client = new LocalTDXClient();

    // Get all applications
    return client.groups
        .search({IsActive: true})
        .catch((e) => handleError("Error fetching TDX groups", e));
}, {
    cacheTime: 1000 * 60 * 5 // 5 minutes
});

export const syncGroupsAtom = unwrap(groupsAtom, t => t);

export default function useGroups() {
    return useAtomValue(syncGroupsAtom);
}