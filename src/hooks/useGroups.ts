import {useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import atomWithCache from "../utils/atomWithCache";

export const groupsAtom = atomWithCache("groups", () => {
    // API Client
    const client = new UWStoutTDXClient();

    // Get all applications
    return client.groups.search({IsActive: true}).catch(() => null);
}, {
    cacheTime: 1000 * 60 * 5 // 5 minutes
});

export const syncGroupsAtom = unwrap(groupsAtom, t => t);

export default function useGroups() {
    return useAtomValue(syncGroupsAtom);
}