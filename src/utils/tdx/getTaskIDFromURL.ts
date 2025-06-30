/**
 * Get the TaskID from the URL
 * @returns The TaskID or null if not found
 */
export default function getTaskIDFromURL(document: Document = window.document): number | null {
    const url = new URL(document.location.href);
    return parseInt(url.searchParams.get("TaskID") || "") || null;
}