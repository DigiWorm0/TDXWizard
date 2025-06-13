import getSettings from "./getSettings";
import sanitizeString from "./sanitizeString";

/**
 * Opens a new window with the given href and title.
 * Fallback to opening an iFrame tab if the settings dictate not to open in a new window.
 * @param href - The URL to open in the new window.
 * @param title - The title for the new window, optional.
 */
export default function openWindow(href: string, title?: string) {
    // Sanitize the href and title to prevent XSS attacks
    // Required since this uses window.eval
    href = sanitizeString(href);
    title = sanitizeString(title ?? "New Window");

    // Check user settings for opening links in a new window
    const {openLinksInNewWindow} = getSettings();
    if (openLinksInNewWindow) {
        // Open a new window with the specified URL and title
        const newWindow = window.open(href, "_blank", "width=992px,height=800px");
        if (newWindow && title)
            newWindow.document.title = title;
    } else {
        // Fallback to new iFrame tab opening
        window.eval(`window.top.WorkMgmt.MainContentManager.instance.openIFrameTab('${title ?? 'New Window'}', '${href}', '${href}', false);`);
    }
}