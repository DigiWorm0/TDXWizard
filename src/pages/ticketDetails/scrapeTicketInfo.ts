import TicketInfo from "../../types/TicketInfo";
import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";

/**
 * Scrapes the ticket information from the page and returns it as a TicketInfo object.
 * Requires the page to be a ticket ticketDetails page.
 * @returns The ticket information.
 */
export default function scrapeTicketInfo(document: Document = window.document) {
    const id = getTicketIDFromURL(document);
    if (!id)
        throw new Error("Could not get ticket ID from URL.");

    const title = document.getElementById("thTicket_spnTitle")?.innerText ?? "";
    const description = document.getElementById("ttDescription")?.innerText ?? "";
    const responsibility = document.getElementById("upResponsibility")?.innerText ?? "";
    const requester = (document.querySelector("div.media-heading") as HTMLElement)?.innerText ?? "";
    const type = document.getElementById("lblTicketType")?.innerText ?? "";
    const status = document.getElementById("thTicket_lblStatus")?.innerText ?? "";
    const completedBy = document.getElementById("lblCompletedBy")?.innerText ?? "";
    const respondedBy = document.getElementById("lblRespondedBy")?.innerText ?? "";
    const modifiedBy = document.getElementById("lblModifiedBy")?.innerText ?? "";
    const createdBy = document.getElementById("lblCreatedBy")?.innerText ?? "";
    const isPickedUp = document.getElementById("divAttribute14087")?.innerText.includes("Yes");

    const tagDiv = document.getElementById("itTags_spnTagDisplay");
    const tags: string[] = [];
    if (tagDiv) {
        for (const tag of tagDiv.children) {
            const _tag = tag as HTMLElement;
            tags.push(_tag.innerText);
        }
    }

    const ticketInfo: TicketInfo = {
        id,
        type,
        status,
        title,
        description,
        responsibility,
        requester,
        completedBy: completedBy.replace("by ", ""),
        respondedBy: respondedBy.replace("by ", ""),
        modifiedBy: modifiedBy.replace("by ", ""),
        createdBy: createdBy.replace("by ", ""),
        tags,
        isPickedUp
    };

    console.log("Ticket Info: ", ticketInfo);
    return ticketInfo;
}