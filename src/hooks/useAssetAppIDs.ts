import {atom, useAtomValue} from "jotai";
import {syncApplicationAtom} from "./useApplications";
import AppID from "../types/AppID";

export const assetAppIDsAtom = atom((get) => {
    const applications = get(syncApplicationAtom);
    if (!applications)
        return [];

    return applications
        .filter(app => app.Type === "Asset/CI")
        .map(app => app.AppID as AppID);
});

export default function useAssetAppIDs() {
    return useAtomValue(assetAppIDsAtom);
}