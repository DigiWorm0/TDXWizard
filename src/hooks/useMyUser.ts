import atomWithCache from "../utils/atomWithCache";
import LocalTDXClient from "../tdx-api/LocalTDXClient";
import {unwrap} from "jotai/utils";
import {useAtomValue} from "jotai";
import {settingsAtom} from "./useSettings";

export const myUserAtom = atomWithCache("myUser", async (get) => {
    const {authKey} = get(settingsAtom);
    const client = new LocalTDXClient(authKey);
    try {
        return await client.auth.getUser();
    } catch (e) {
        return null;
    }
}, {
    cacheTime: 1000 * 60 * 5 // 5 minutes
});
export const myUserSyncAtom = unwrap(myUserAtom, p => p);

export default function useMyUser() {
    return useAtomValue(myUserSyncAtom);
}