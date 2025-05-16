import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {syncTicketStatusesAtom} from "./useTicketStatuses";

export const ticketStatusIDAtomFamily = atomFamily((name: string) => atom(
    (get) => {
        // Get ticket statuses from App ID
        const ticketStatuses = get(syncTicketStatusesAtom);
        if (!ticketStatuses)
            return null;

        // Get the ticket status ID
        const status = ticketStatuses.find(status => status.Name === name);
        return status?.ID ?? null;
    }
))

export default function useTicketStatusID(name: string) {
    return useAtomValue(ticketStatusIDAtomFamily(name));
}