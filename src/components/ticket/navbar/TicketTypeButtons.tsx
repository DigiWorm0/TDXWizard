import React from "react";
import LocalTDXClient from "../../../tdx-api/LocalTDXClient";
import getTicketIDFromURL from "../../../tdx-api/utils/getTicketIDFromURL";
import findTicketTypes from "../../../utils/ticketType/findTicketTypes";
import StatusClass from "../../../tdx-api/types/StatusClass";
import useSettings from "../../../hooks/useSettings";
import useTicket from "../../../hooks/useTicket";
import getAppIDFromURL from "../../../tdx-api/utils/getAppIDFromURL";
import TDXButtonGroup from "../../common/TDXButtonGroup";
import TDXButton from "../../common/TDXButton";
import useTicketTypes from "../../../hooks/useTicketTypes";
import TicketType from "../../../tdx-api/types/TicketType";
import checkIsUWStout from "../../../utils/checkIsUWStout";

const TASK_NAME = "Recategorize Ticket";

const UWSTOUT_HIDE_TICKET_TYPES = [
    2274,   // Chargebacks
    99,     // General/EmailService
    663     // General/Portal
];

const UWSTOUT_TYPE_ALIASES = {
    630: "Lab Rooms",
    999: "Lab Hardware",
    995: "CTS",
    997: "eStout",
    998: "Surplus"
};

export default function TicketTypeButtons() {
    const ticket = useTicket();
    const [settings] = useSettings();
    const allTicketTypes = useTicketTypes();

    const visibleTicketTypes = React.useMemo(() => {
        let hiddenTicketTypes = [...settings.hideTicketTypes];
        let typeAliases = {...settings.ticketTypeAliases};

        // Append UW-Stout specific hidden ticket types and aliases
        if (checkIsUWStout()) {
            hiddenTicketTypes.push(...UWSTOUT_HIDE_TICKET_TYPES);
            typeAliases = {...typeAliases, ...UWSTOUT_TYPE_ALIASES}
        }

        return allTicketTypes
            // Hide hidden ticket types
            ?.filter(type => !hiddenTicketTypes.includes(type.ID))

            // Apply name aliases
            .map(type => ({...type, Name: typeAliases[type.ID] || type.Name}))
    }, [allTicketTypes]);

    const suggestedTypeIDs = React.useMemo(() => {
        // Check if ticket is loaded
        if (!ticket)
            return null;

        // Check if type is set
        if (ticket.TypeCategoryName !== "General" && settings.autoHideTicketTypes)
            return null;
        if (ticket.StatusClass === StatusClass.Cancelled)
            return null;

        // Get the possible ticket types
        return findTicketTypes(ticket);
    }, [ticket, settings]);

    const suggestedTypes = React.useMemo(() => {
        // Check if suggested types are available
        if (!suggestedTypeIDs)
            return null;

        // Get the ticket types from the IDs
        return visibleTicketTypes?.filter(type => suggestedTypeIDs.includes(type.ID));
    }, [suggestedTypeIDs, visibleTicketTypes]);

    const completeTask = async () => {

        // API Client
        const client = new LocalTDXClient();

        // Get Ticket ID
        const ticketID = getTicketIDFromURL();
        if (!ticketID)
            throw new Error("Ticket ID not found");

        // Get App ID
        const appID = getAppIDFromURL();
        if (!appID)
            throw new Error("App ID not found");

        // Find the task
        const task = ticket?.Tasks?.find(t => t.Title === TASK_NAME);
        if (!task)
            return;

        // Mark the task as complete
        await client.ticketTasks.updateTicketTaskFeed(appID, ticketID, task.ID, {
            PercentComplete: 100
        });
    }

    const setType = async (type: TicketType) => {

        // API Client
        const client = new LocalTDXClient();

        // Get Ticket ID
        const ticketID = getTicketIDFromURL();
        if (!ticketID)
            throw new Error("Ticket ID not found");

        // Get App ID
        const appID = getAppIDFromURL();
        if (!appID)
            throw new Error("App ID not found");

        // Update Ticket
        await client.tickets.updateTicket(appID, ticketID, {TypeID: type.ID});

        // Complete the task if it exists
        await completeTask();

        // Reload/Close the page
        if (settings.autoCloseTicketOnSave)
            window.close();
        else
            window.location.reload();
    }

    const setSpam = async () => {

        // API Client
        const client = new LocalTDXClient();

        // Get Ticket ID
        const ticketID = getTicketIDFromURL();
        if (!ticketID)
            throw new Error("Ticket ID not found");

        // Get App ID
        const appID = getAppIDFromURL();
        if (!appID)
            throw new Error("App ID not found");

        // Get Ticket Info
        const ticketInfo = await client.tickets.getTicket(appID, ticketID);

        // Edit Ticket
        await client.tickets.editTicket(43, ticketID, {
            ...ticketInfo,
            StatusID: 198, // Cancelled
        });

        // Complete the task if it exists
        await completeTask();

        // Reload/Close the page
        if (settings.autoCloseTicketOnSave)
            window.close();
        else
            window.location.reload();
    }

    if (!checkIsUWStout())
        return null;
    if (!suggestedTypes || !visibleTicketTypes)
        return null;
    return (
        <TDXButtonGroup>
            {suggestedTypes.map(type => (
                <TDXButton
                    key={type.ID}
                    onClick={() => setType(type)}
                    noMargin
                    icon={`fa fa-solid fa-nopad fa-tag`}
                    text={type.Name}
                />
            ))}
            <TDXButtonGroup noMargin>
                <TDXButton
                    noMargin
                    toggleDropdown
                    icon={"fa fa-solid fa-nopad fa-lg fa-caret-down"}
                />

                <ul
                    style={{cursor: "default"}}
                    className={"dropdown-menu"}
                >
                    <li>
                        <a
                            className={"dropdown-item"}
                            href={"#"}
                            onClick={setSpam}
                        >
                            Spam
                        </a>
                    </li>

                    <hr
                        style={{
                            marginTop: 8,
                            marginBottom: 8
                        }}
                        className="dropdown-divider"
                    />
                    {visibleTicketTypes
                        .sort((a, b) => a.Name.localeCompare(b.Name))
                        .map(ticketType => (
                            <li key={ticketType.ID}>
                                <a
                                    className={"dropdown-item"}
                                    href={"#"}
                                    onClick={() => setType(ticketType)}
                                >
                                    {ticketType.Name}
                                </a>
                            </li>
                        ))}
                </ul>
            </TDXButtonGroup>
        </TDXButtonGroup>
    )
}