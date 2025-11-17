import getSettings from "./getSettings";
import {unsafeWindow} from "$";
import warnUserIfPopupsBlocked from "./warnUserIfPopupsBlocked";

/**
 * Opens a new window with the given href and title.
 * Falls back to opening an TDX tab if "open in new window" is disabled.
 * @param href - The URL to open in the new window.
 * @param title - The title for the new window, optional.
 * @param fallbackToIFrame - If true, will open the URL in an TDX iFrame tab if the new window cannot be opened.
 */
export default function openWindow(
    href: string,
    title?: string,
    fallbackToIFrame: boolean = true
) {

    // Check user settings for opening links in a new window
    const {
        enableOpenLinksIn,
        openLinksIn,
        defaultWindowHeight,
        defaultWindowWidth
    } = getSettings();

    const openInNewWindow = enableOpenLinksIn && openLinksIn === "newWindow";
    const openInNewTab = enableOpenLinksIn && openLinksIn === "newTab";
    const openInNewTDXTab = enableOpenLinksIn && openLinksIn === "newTDXTab";


    if (openInNewWindow) {

        // Based on https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen

        // Get dual-screen offset
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

        // Get the current window dimensions
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;

        // Calculate center position for the new window (w/ dual-screen offset)
        const windowLeft = (screenWidth - defaultWindowWidth) / 2 + dualScreenLeft;
        const windowTop = (screenHeight - defaultWindowHeight) / 2 + dualScreenTop;

        // Open a new window with the specified URL and title
        const newWindow = window.open(
            href,
            "_blank",
            `width=${defaultWindowWidth},height=${defaultWindowHeight},left=${windowLeft},top=${windowTop}`);

        // Check for popups being blocked
        warnUserIfPopupsBlocked(newWindow);

        // Rename the new window if it was successfully opened
        if (newWindow && title)
            newWindow.document.title = title;
    } else if (openInNewTab) {
        // Open in a new browser tab
        const newTab = window.open(href, '_blank');

        // Check for popups being blocked
        warnUserIfPopupsBlocked(newTab);
    } else if (fallbackToIFrame || openInNewTDXTab) {
        // Fallback to new iFrame tab opening
        const randomID = `window_${Math.random().toString(36).substring(2, 10)}`;
        unsafeWindow.top?.WorkMgmt.MainContentManager.instance.openIFrameTab(title ?? 'New Window', randomID, href, false);
    } else {
        // Fallback to opening in the current window
        window.location.href = href;
    }
}