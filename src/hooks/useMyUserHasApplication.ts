import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {myUserSyncAtom} from "./useMyUser";

export const myUserHasApplication = atomFamily((application: string) => {
    return atom((get) => {
        // Get the current user
        const myUser = get(myUserSyncAtom);

        // If the user is not defined, return false
        if (!myUser)
            return false;

        // Check if the user has the specified application
        return myUser.Applications?.includes(application) ?? false;
    })
});

export default function useMyUserHasApplication(application: string) {
    return useAtomValue(myUserHasApplication(application));
}