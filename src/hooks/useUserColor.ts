import {atomFamily} from "jotai/utils";
import Guid from "../tdx-api/types/Guid";
import {atom, useAtomValue} from "jotai";
import {userAtomFamily} from "./useUser";
import getColorFromRefID from "../utils/getColorFromRefID";

export const userColorAtomFamily = atomFamily((uid: Guid) => {
    return atom((get) => {
        const user = get(userAtomFamily(uid));
        return getColorFromRefID(user?.ReferenceID ?? 0);
    });
});

export default function useUserColor(uid: Guid) {
    return useAtomValue(userColorAtomFamily(uid));
}