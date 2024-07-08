import PageScript from "../PageScript";
import scrapeTicketInfo from "./scrapeTicketInfo";
import findTicketTypes from "../../utils/ticketType/findTicketTypes";
import TicketType from "../../types/TicketType";
import ticketTypeNames from "../../db/TicketTypeNames";
import addNavButton from "./addNavButton";
import TicketInfo from "../../types/TicketInfo";
import addActionButton from "./addActionButton";
import editTicket from "../../utils/tdx/editTicket";
import updateTicket from "../../utils/tdx/updateTicket";
import confirmAction from "../../utils/confirmAction";
import getSettings from "../../utils/settings/getSettings";
import createDropdown, {DropdownOption} from "../../utils/ui/createDropdown";

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
    }

    static addTicketTypeButtons(ticketInfo: TicketInfo) {

        // Check Settings
        const settings = getSettings();
        if (!settings.showTicketTypeButtons)
            return;

        // Check if the ticket is a generic type
        const isGenericType = ticketInfo.type.startsWith("General / ");
        if (settings.autoHideTicketTypes && !isGenericType)
            return;

        // Get the possible ticket types
        let ticketTypes = findTicketTypes(ticketInfo);

        // Get Navbar
        const navBar = document.getElementById("divTabHeader")?.children[0];
        if (!navBar)
            throw new Error("Nav Bar not found");

        // Create Nav Container
        const navContainer = document.createElement("li");
        navBar.appendChild(navContainer);

        // Create Button Group
        const buttonGroup = document.createElement("div");
        buttonGroup.className = "btn-group";
        navContainer.appendChild(buttonGroup);

        // Add buttons for each ticket type
        for (const ticketType of ticketTypes) {
            const _ticketType = ticketType as TicketType;

            // Create Button
            const buttonName = ticketTypeNames[_ticketType] || _ticketType;
            const button = addNavButton(
                () => {
                    if (confirmAction(`Set ticket type to ${ticketType}?`))
                        editTicket({ type: _ticketType }).catch(console.error);
                },
                buttonName,
                "tag",
                `Set Type to ${ticketType}`
            );

            // Update Style
            button.style.margin = "0 0";
            if (ticketInfo.type.includes(ticketType))
                button.className += " disabled";

            // Add Button to Group
            buttonGroup.appendChild(button);
        }

        // Add Ticket Type Dropdown
        const dropdown = TicketDetailsPage.addTicketTypeDropdown();
        buttonGroup.appendChild(dropdown);
    }

    static addSurplusButton(ticketInfo: TicketInfo) {
        // Check Settings
        const settings = getSettings();
        if (!settings.showSurplusButtons)
            return;

        // Check if the ticket is already a surplus ticket
        const isSurplusType = ticketInfo.type.includes(TicketType.Surplus);
        const isSurplusTag = ticketInfo.tags.includes("Surplus");
        const isSurplus = isSurplusType && isSurplusTag;
        if (isSurplus)
            return;

        addActionButton(
            () => {
                if (confirmAction("Convert ticket to surplus?"))
                    editTicket({ type: TicketType.Surplus, tags: ["Surplus"] }).catch(console.error)
            },
            "Convert to Surplus"
        );
    }

    static addSurplusPickupButton(ticketInfo: TicketInfo) {
        // Check Settings
        const settings = getSettings();
        if (!settings.showSurplusButtons)
            return;

        // Check if the ticket is a surplus ticket
        const isSurplusType = ticketInfo.type.includes(TicketType.Surplus);
        const isSurplusTag = ticketInfo.tags.includes("Surplus");
        const isSurplus = isSurplusType && isSurplusTag;
        if (!isSurplus)
            return;

        // Add Surplus Pickup Button
        addActionButton(
            () => {
                if (confirmAction("Mark surplus ticket as picked up?"))
                    updateTicket({
                        comments: "Device is in PC-Repair",
                        isPrivate: true,
                        isPickedUp: true
                    }).catch(console.error)
            },
            "Pickup Surplus"
        );
    }

    static addTicketTypeDropdown() {

        const options: DropdownOption[] = [
            {name: "Spam", value: "spam"},
            ...Object.values(TicketType).map((type) => ({
                name: ticketTypeNames[type] || type,
                value: type
            }))
        ];

        const { container, button } = createDropdown(
            "",
            options,
            (value) => {
                // Spam
                if (value === "spam") {
                    if (confirmAction("Mark ticket as spam?"))
                        editTicket({ status: "Cancelled" }).catch(console.error);
                }
                // Ticket Type
                else
                {
                    const ticketType = value as TicketType;
                    if (confirmAction(`Set ticket type to ${ticketType}?`))
                        editTicket({ type: ticketType }).catch(console.error);
                }
            }
        );

        // Change Button Class
        button.title = "Set Ticket Type";
        button.style.margin = "0 0";
        button.style.paddingLeft = "10px";
        button.style.paddingRight = "8px";
        button.classList.remove("btn-primary");
        button.classList.add("btn-warning");

        // Add container to the nav bar
        const ticketNavBar = document.getElementById("divTabHeader")?.children[0];
        ticketNavBar?.appendChild(container);

        return container;
    }

    static addAutoAssignButtons(ticketInfo: TicketInfo) {
        // Check Settings
        const settings = getSettings();
        if (!settings.showTicketAssignButtons)
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
            () => {
                if (confirmAction(`Assign ticket to ${autoAssignName}?`))
                    editTicket({ responsibility: autoAssignName }).catch(console.error)
            },
            autoAssignName,
            "user",
            `Assign to ${autoAssignName}`
        );
    }
}