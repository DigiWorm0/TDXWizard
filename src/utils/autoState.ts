import AutoState from "../types/AutoState";
import { GM_setValue, GM_getValue } from "$";

export function setAutoState(state: AutoState) {
    GM_setValue("autoState", JSON.stringify(state));
}

export function getAutoState(): AutoState {
    const state = GM_getValue("autoState", "{}");
    return JSON.parse(state);
}