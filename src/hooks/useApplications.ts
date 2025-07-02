import {useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import atomWithCache from "../utils/atomWithCache";

export const applicationsAtom = atomWithCache("myApps", async () => {
    // API Client
    const client = new LocalTDXClient();

    // Get all applications
    try {
        return await client.applications.getApplications();
    } catch (e) {
        return null;
    }
}, {
    cacheTime: 1000 * 60 * 5 // 5 minutes
});

export const syncApplicationAtom = unwrap(applicationsAtom, t => t);

export default function useApplications() {
    return useAtomValue(syncApplicationAtom);
}