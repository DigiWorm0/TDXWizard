import PageScript from "../PageScript";
import scrapeTicketInfo from "./scrapeTicketInfo";
import findTicketTypes from "../../utils/ticketType/findTicketTypes";
import DefaultSettings from "../../db/DefaultSettings";
import TicketType from "../../types/TicketType";
import showStats from "../../utils/stats/showStats";
import ticketTypeNames from "../../db/TicketTypeNames";
import addNavButton from "./addNavButton";
import TicketInfo from "../../types/TicketInfo";
import addActionButton from "./addActionButton";
import editTicket from "../../utils/tdx/editTicket";

const URL_PREFIX = "/TDNext/Apps/43/Tickets/TicketDet"

export default class TicketDetailsPage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {
        // Scrape the ticket info
        const ticketInfo = scrapeTicketInfo();
        console.log(ticketInfo);

        // Add Buttons
        TicketDetailsPage.addSurplusButton(ticketInfo);
        TicketDetailsPage.addSurplusPickupButton(ticketInfo);
        TicketDetailsPage.addTicketTypeButtons(ticketInfo);
        TicketDetailsPage.addAutoAssignButtons(ticketInfo);
        //TicketDetailsPage.addStatsButton();
    }

    static addTicketTypeButtons(ticketInfo: TicketInfo) {
        // Check Settings
        if (!DefaultSettings.showTicketTypeButtons)
            return;

        // Check if the ticket is a generic type
        const isGenericType = ticketInfo.type.startsWith("General / ");
        if (DefaultSettings.autoHideTicketTypes && !isGenericType)
            return;

        // Get the possible ticket types
        let ticketTypes = findTicketTypes(ticketInfo);

        // Add buttons for each ticket type
        for (const ticketType of ticketTypes) {
            const _ticketType = ticketType as TicketType;
            const buttonName = ticketTypeNames[_ticketType] || _ticketType;
            const button = addNavButton(
                () => editTicket({ type: _ticketType }).catch(console.error),
                buttonName,
                "tag",
                `Set Type to ${ticketType}`
            );

            if (ticketInfo.type.includes(ticketType))
                button.className += " disabled";
        }

        // Add Spam Button
        TicketDetailsPage.addSpamButton(ticketInfo);
    }

    static addSpamButton(ticketInfo: TicketInfo) {
        const spamButton = addNavButton(
            () => editTicket({ status: "Cancelled" }).catch(console.error),
            undefined,
            "cancel",
            "Mark Spam"
        );
        spamButton.className = "btn btn-danger btn-sm";

        // Disable the spam button if the ticket is already cancelled
        if (ticketInfo.status === "Cancelled")
            spamButton.className += " disabled";
    }

    static addSurplusButton(ticketInfo: TicketInfo) {
        // Check Settings
        if (!DefaultSettings.showSurplusButtons)
            return;

        // Check if the ticket is already a surplus ticket
        const isSurplusType = ticketInfo.type.includes(TicketType.Surplus);
        const isSurplusTag = ticketInfo.tags.includes("Surplus");
        const isSurplus = isSurplusType && isSurplusTag;
        if (isSurplus)
            return;

        addActionButton(
            () => editTicket({ type: TicketType.Surplus, tags: ["Surplus"] }).catch(console.error),
            "Convert to Surplus"
        );
    }

    static addSurplusPickupButton(ticketInfo: TicketInfo) {
        // Check Settings
        if (!DefaultSettings.showSurplusButtons)
            return;

        // Check if the ticket is a surplus ticket
        const isSurplusType = ticketInfo.type.includes(TicketType.Surplus);
        const isSurplusTag = ticketInfo.tags.includes("Surplus");
        const isSurplus = isSurplusType && isSurplusTag;
        if (!isSurplus)
            return;

        // Add Surplus Pickup Button
        addActionButton(
            () => editTicket({ type: "Reimage" }).catch(console.error),
            "Pickup Surplus"
        );
    }

    static addStatsButton() {
        // TODO: Move stats button

        // Add Stats Button
        if (DefaultSettings.showStatsButton) {
            const statsButton = addNavButton(
                showStats,
                undefined,
                "chart-pie",
                "View Stats"
            );
            statsButton.className = "btn btn-info btn-sm";
        }
    }

    static addAutoAssignButtons(ticketInfo: TicketInfo) {
        // Check Settings
        if (!DefaultSettings.showTicketAssignButtons)
            return;

        // Check Ticket Status
        if (ticketInfo.status !== "Resolved" &&
            ticketInfo.status !== "Closed")
            return;

        // Check Ticket Info
        const isAssigned = ticketInfo.responsibility !== "Unassigned" &&
            ticketInfo.responsibility !== "PC Repair" &&
            ticketInfo.responsibility !== "TechHelpDesk" &&
            ticketInfo.responsibility !== "VoIP" &&
            ticketInfo.responsibility !== "SLS Tech" &&
            ticketInfo.responsibility !== "Classroom Technologies" &&
            ticketInfo.responsibility !== "ImageNow and Forms" &&
            ticketInfo.responsibility !== "Client Tech Services" &&
            ticketInfo.responsibility !== "Network" &&
            ticketInfo.responsibility !== "Server" &&
            ticketInfo.responsibility !== "Lab and Software";
        if (isAssigned)
            return;

        // Add Assign Button
        const autoAssignName = ticketInfo.completedBy || ticketInfo.respondedBy || ticketInfo.modifiedBy || ticketInfo.createdBy;
        addNavButton(
            () => editTicket({ responsibility: autoAssignName }).catch(console.error),
            autoAssignName,
            "user",
            `Assign to ${autoAssignName}`
        );
    }
}