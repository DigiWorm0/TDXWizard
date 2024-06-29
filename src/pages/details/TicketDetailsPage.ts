import PageScript from "../PageScript";
import scrapeTicketInfo from "./scrapeTicketInfo";
import findTicketTypes from "../../utils/ticketType/findTicketTypes";
import DefaultSettings from "../../db/DefaultSettings";
import { setAutoState } from "../../utils/autoState";
import TicketType from "../../types/TicketType";
import incrementTicketCount from "../../utils/stats/incrementTicketCount";
import addNavButton from "../../utils/tdx/addNavButton";
import showStats from "../../utils/stats/showStats";
import ticketTypeNames from "../../db/TicketTypeNames";

const URL_PREFIX = "/TDNext/Apps/43/Tickets/TicketDet"

export default class TicketDetailsPage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {
        // Scrape the ticket info
        const ticketInfo = scrapeTicketInfo();
        console.log(ticketInfo);

        // Get the possible ticket types
        let ticketTypes = findTicketTypes(ticketInfo);
        console.log("Ticket Types: ", ticketTypes);

        // Check if the ticket type is already set
        const shouldHideTypes = (DefaultSettings.autoHideTicketTypes && !ticketInfo.type.startsWith("General / ")) || !DefaultSettings.showTicketTypeButtons;
        if (shouldHideTypes)
            ticketTypes = [];

        // Add buttons for each ticket type
        for (const ticketType of ticketTypes) {
            const _ticketType = ticketType as TicketType;

            const buttonName = ticketTypeNames[_ticketType] || _ticketType;
            const button = addNavButton(
                () => {
                    setAutoState({
                        nextAction: "setTicketType",
                        ticketType: _ticketType
                    })
                    incrementTicketCount();
                    const editButton = document.getElementById("btnEdit");
                    editButton?.click();
                },
                buttonName,
                "wand-magic-sparkles",
                `Set Type to ${ticketType}`
            );

            if (ticketInfo.type.includes(ticketType))
                button.className += " disabled";
        }

        // Add Assign Button
        const shouldHideAssign = ticketInfo.status === "Cancelled" ||
            ticketInfo.responsibility !== "Unassigned" ||
            !DefaultSettings.showTicketAssignButtons;
        if (!shouldHideAssign) {
            const autoAssignName = ticketInfo.completedBy || ticketInfo.respondedBy || ticketInfo.modifiedBy || ticketInfo.createdBy;

            // Add Assign Button
            addNavButton(
                () => {
                    // TODO
                    alert("Unimplemented");
                },
                autoAssignName,
                "user",
                `Assign to ${autoAssignName}`
            );
        }

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

        // Add Spam Button
        if (!shouldHideTypes) {
            const spamButton = addNavButton(
                () => {
                    setAutoState({nextAction: "markTicketSpam"});
                    incrementTicketCount();
                    const editButton = document.getElementById("btnEdit");
                    editButton?.click();
                },
                undefined,
                "cancel",
                "Mark Spam"
            );
            spamButton.className = "btn btn-danger btn-sm";

            // Disable the spam button if the ticket is already cancelled
            if (ticketInfo.status === "Cancelled")
                spamButton.className += " disabled";
        }
    }
}