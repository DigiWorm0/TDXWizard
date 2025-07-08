import getSettings from "./getSettings";
import {unsafeWindow} from "$";

/**
 * Opens a new window with the given href and title.
 * Falls back to opening an TDX tab if "open in new window" is disabled.
 * @param href - The URL to open in the new window.
 * @param title - The title for the new window, optional.
 */
export default function openWindow(href: string, title?: string) {

    // Check user settings for opening links in a new window
    const {
        openLinksInNewWindow,
        defaultWindowHeight,
        defaultWindowWidth
    } = getSettings();
    if (openLinksInNewWindow) {

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
        const newWindow = window.open(href, "_blank", `width=${defaultWindowWidth},height=${defaultWindowHeight},left=${windowLeft},top=${windowTop}`);

        // Rename the new window if it was successfully opened
        if (newWindow && title)
            newWindow.document.title = title;
    } else {
        // Fallback to new iFrame tab opening
        unsafeWindow.top?.WorkMgmt.MainContentManager.instance.openIFrameTab(title ?? 'New Window', href, href, false);
    }
}