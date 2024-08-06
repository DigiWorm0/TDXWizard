import {atomFamily} from "jotai/utils";
import Guid from "../tdx-api/types/Guid";
import {atom, useAtomValue} from "jotai";
import {userAtomFamily} from "./useUser";
import getColorFromRefID from "../utils/getColorFromRefID";
import {settingsAtom} from "./useSettings";
import {myUserSyncAtom} from "./useMyUser";

export const userColorAtomFamily = atomFamily((uid: Guid) => {
    return atom((get) => {
        const settings = get(settingsAtom);
        const myUser = get(myUserSyncAtom);

        // If the user has a custom profile color, use that
        if (settings.useCustomProfileColor && myUser?.UID === uid)
            return settings.customProfileColor;

        // Otherwise, use the user's reference ID to determine their color
        const user = get(userAtomFamily(uid));
        return getColorFromRefID(user?.ReferenceID ?? 0);
    });
});

export default function useUserColor(uid: Guid) {
    return useAtomValue(userColorAtomFamily(uid));
}