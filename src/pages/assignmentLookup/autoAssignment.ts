import { GM_setValue, GM_getValue } from "$";

/**
 * Set the auto assignment name. Set to undefined to disable auto assignment.
 * @param name - The name to set.
 */
export function setAutoAssignment(name?: string) {
    GM_setValue("autoAssignment", name);
}

/**
 * Get the auto assignment name.
 * @returns The auto assignment name. Undefined if auto assignment is disabled.
 */
export function getAutoAssignment(): string | undefined {
    return GM_getValue("autoAssignment");
}