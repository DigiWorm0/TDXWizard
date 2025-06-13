/**
 * Sanitize a string by removing JS and HTML tags, and normalizing whitespace.
 * @param str - The string to sanitize.
 */
export default function sanitizeString(str: string): string {

    // Create a DOMParser to parse the string as HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');

    // Pull the text content from the body
    const sanitized = doc.body.textContent || '';
    return sanitized.replace(/[\n\r\t]+/g, ' ').trim();
}