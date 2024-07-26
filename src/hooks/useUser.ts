import {atomFamily, unwrap} from "jotai/utils";
import Guid from "../tdx-api/types/Guid";
import UWStoutTDXClient from "../utils/tdx/UWStoutTDXClient";
import {atom, useAtomValue} from "jotai";

export const userAtomFamily = atomFamily((uid: Guid) => {
    const userAtom = atom(async () => {
        const client = new UWStoutTDXClient();
        return await client.people.getPerson(uid ?? "");
    });
    return unwrap(userAtom, u => u);
});

export default function useUser(uid: Guid) {
    return useAtomValue(userAtomFamily(uid));
}