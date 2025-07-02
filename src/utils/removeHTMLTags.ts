/**
 * Removes HTML tags from a string.
 * Warning: This is not a secure way to sanitize HTML and is only suitable for simple use cases.
 * @param html - The HTML string to sanitize.
 */
export default function removeHTMLTags(html: string): string {
    return html.replace(/<[^>]*>/g, "");
}

/**
 * Replaces common HTML entities with their ASCII equivalents.
 * @param html - The HTML string to process.
 */
export function replaceHTMLEntities(html: string): string {
    return html.replace(/&quot;/g, "\"")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ");
}