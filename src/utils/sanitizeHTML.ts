/**
 * Securely sanitize HTML input by stripping out all tags and returning plain text.
 * @param html - The HTML string to sanitize.
 * @return The sanitized text content, with all HTML tags removed.
 */
export default function sanitizeHTML(html: string): string {
    // Create a new DOMParser instance to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Pull the text content from the body
    const sanitizedText = doc.body.textContent || "";
    return sanitizedText.replace(/[\n\r\t]+/g, "").trim();
}