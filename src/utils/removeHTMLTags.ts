export default function removeHTMLTags(html: string): string {
    return html.replace(/<[^>]*>/g, "");
}

export function replaceHTMLEntities(html: string): string {
    return html.replace(/&quot;/g, "\"")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ");
}