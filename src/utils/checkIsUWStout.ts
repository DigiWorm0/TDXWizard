/**
 * Checks if the current hostname is for UW-Stout's TeamDynamix instance.
 * @returns {boolean} True if the hostname matches UW-Stout's TeamDynamix, false otherwise.
 */
export default function checkIsUWStout(): boolean {
    return document.location.hostname === "uwstout.teamdynamix.com";
}