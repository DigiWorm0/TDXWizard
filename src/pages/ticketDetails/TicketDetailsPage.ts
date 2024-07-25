import PageScript from "../PageScript";
import findTicketTypes from "../../utils/ticketType/findTicketTypes";
import TicketType from "../../types/TicketType";
import ticketTypeNames from "../../db/TicketTypeNames";
import addNavButton from "./addNavButton";
import editTicket from "../../utils/tdx/editTicket";
import confirmAction from "../../utils/confirmAction";
import getSettings from "../../hooks/settings/getSettings";
import createDropdown, {DropdownOption} from "../../utils/ui/createDropdown";
import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import UWStoutTDXClient from "../../utils/UWStoutTDXClient";
import Ticket from "../../tdx-api/types/Ticket";

const URL_PREFIX = "/TDNext/Apps/43/Tickets/TicketDet"

export default class TicketDetailsPage implements PageScript {

    canRun() {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run() {
        // Get Ticket Info
        const client = new UWStoutTDXClient();
        const ticketID = getTicketIDFromURL();
        if (!ticketID)
            throw new Error("Ticket ID not found");
        client.tickets.getTicket(43, ticketID).then((ticketInfo) => {
            console.log(ticketInfo);

            TicketDetailsPage.addTicketTypeButtons(ticketInfo);
            TicketDetailsPage.addAutoAssignButtons(ticketInfo);
        }).catch(console.error);
    }

    static addTicketTypeButtons(ticketInfo: Ticket) {

        // Check Settings
        const settings = getSettings();
        if (!settings.showTicketTypeButtons)
            return;

        // Check if the ticket is a generic type
        const isGenericType = ticketInfo.TypeCategoryName === "General";
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
                        editTicket({type: _ticketType}).catch(console.error);
                },
                buttonName,
                "tag",
                `Set Type to ${ticketType}`
            );

            // Update Style
            button.style.margin = "0 0";
            if (ticketInfo.TypeName.includes(ticketType))
                button.className += " disabled";

            // Add Button to Group
            buttonGroup.appendChild(button);
        }

        // Add Ticket Type Dropdown
        const dropdown = TicketDetailsPage.addTicketTypeDropdown();
        buttonGroup.appendChild(dropdown);
    }

    static addTicketTypeDropdown() {

        const options: DropdownOption[] = [
            {name: "Spam", value: "spam"},
            {type: "divider"},
            ...Object
                .values(TicketType)
                .map((type) => ({
                    name: ticketTypeNames[type] || type,
                    value: type
                }))
                .sort((a, b) => a.name.localeCompare(b.name))
        ];

        const {container, button} = createDropdown(
            "",
            options,
            (value) => {
                // Spam
                if (value === "spam") {
                    if (confirmAction("Mark ticket as spam?"))
                        editTicket({status: "Cancelled"}).catch(console.error);
                }
                // Ticket Type
                else {
                    const ticketType = value as TicketType;
                    if (confirmAction(`Set ticket type to ${ticketType}?`))
                        editTicket({type: ticketType}).catch(console.error);
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

    static addAutoAssignButtons(ticketInfo: Ticket) {
        // Check Settings
        const settings = getSettings();
        if (!settings.showTicketAssignButtons)
            return;

        // Check Ticket Status
        if (ticketInfo.StatusName !== "Resolved" &&
            ticketInfo.StatusName !== "Closed")
            return;

        // Check Ticket Info
        const isAssigned = ticketInfo.ResponsibleUid !== null;
        if (isAssigned)
            return;

        // Add Assign Button
        const autoAssignName = ticketInfo.CompletedFullName || ticketInfo.RespondedFullName || ticketInfo.ModifiedFullName || ticketInfo.CreatedFullName;
        addNavButton(
            () => {
                if (confirmAction(`Assign ticket to ${autoAssignName}?`))
                    editTicket({responsibility: autoAssignName}).catch(console.error)
            },
            autoAssignName,
            "user",
            `Assign to ${autoAssignName}`
        );
    }
}