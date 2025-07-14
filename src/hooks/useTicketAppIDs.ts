import {atom, useAtomValue} from "jotai";
import {syncApplicationAtom} from "./useApplications";
import AppID from "../types/AppID";

export const ticketAppIDsAtom = atom((get) => {
    const applications = get(syncApplicationAtom);
    if (!applications)
        return [];

    return applications
        // .filter(app => app.Active) // <-- Not available to some users depending on their permissions
        .filter(app => app.Type === "Ticketing")
        .map(app => app.AppID as AppID);
});

export default function useTicketAppIDs() {
    return useAtomValue(ticketAppIDsAtom);
}