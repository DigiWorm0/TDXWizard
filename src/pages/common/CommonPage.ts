import PageScript from "../PageScript";
import getSettings from "../../utils/settings/getSettings";

const URL_PREFIX = "/TDNext"

export default class CommonPage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {
        CommonPage.replaceAllEmailLinks();
    }

    /**
     * Removes anchor from all mailto: / tel: links
     */
    static replaceAllEmailLinks() {
        // Check Settings
        const settings = getSettings();
        if (!settings.unlinkEmails)
            return;

        // Find all mailto links
        const mailtoLinks = document.querySelectorAll("a[href^='mailto:']");
        const telLinks = document.querySelectorAll("a[href^='tel:']");

        // Iterate through the mailto links
        for (const mailtoLink of mailtoLinks) {
            const _mailtoLink = mailtoLink as HTMLAnchorElement;

            // Get the email
            const email = _mailtoLink.href.replace("mailto:", "");

            // Replace the href with a span
            const span = document.createElement("span");
            span.textContent = email;

            // Replace the link
            _mailtoLink.replaceWith(span);
        }

        // Iterate through the tel links
        for (const telLink of telLinks) {
            const _telLink = telLink as HTMLAnchorElement;

            // Get the tel
            const tel = _telLink.href
                .replace("tel:", "")
                .replace("+1-", "");

            // Replace the href with a span
            const span = document.createElement("span");
            span.textContent = tel;

            // Replace the link
            _telLink.replaceWith(span);
        }
    }
}