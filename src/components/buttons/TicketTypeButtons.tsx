import React from "react";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import findTicketTypes from "../../utils/ticketType/findTicketTypes";
import StatusClass from "../../tdx-api/types/StatusClass";
import useSettings from "../../hooks/useSettings";
import useTicket from "../../hooks/useTicket";
import TicketTypes, {TicketType} from "../../db/TicketTypes";
import getAppIDFromURL from "../../utils/tdx/getAppIDFromURL";
import TDXButtonGroup from "./common/TDXButtonGroup";
import TDXButton from "./common/TDXButton";

export default function TicketTypeButtons() {
    const ticket = useTicket();
    const [settings] = useSettings();

    const types = React.useMemo(() => {
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

    const setType = async (type: TicketType) => {

        // API Client
        const client = new UWStoutTDXClient();

        // Get Ticket ID
        const ticketID = getTicketIDFromURL();
        if (!ticketID)
            throw new Error("Ticket ID not found");

        // Get App ID
        const appID = getAppIDFromURL();
        if (!appID)
            throw new Error("App ID not found");

        // Get Type ID
        const ticketTypeID = TicketTypes[type as TicketType];
        if (!ticketTypeID)
            throw new Error("Ticket Type not found");

        // Update Ticket
        await client.tickets.updateTicket(appID, ticketID, {TypeID: ticketTypeID});

        // Reload/Close the page
        if (settings.autoCloseTicketOnSave)
            window.close();
        else
            window.location.reload();
    }

    const setSpam = async () => {
        console.log("Setting Spam");

        // API Client
        const client = new UWStoutTDXClient();

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

        // Reload/Close the page
        if (settings.autoCloseTicketOnSave)
            window.close();
        else
            window.location.reload();
    }

    if (!types)
        return null;
    return (
        <TDXButtonGroup>
            {types?.map(type => (
                <TDXButton
                    key={type}
                    onClick={() => setType(type as TicketType)}
                    noMargin
                    icon={`fa fa-solid fa-nopad fa-tag`}
                    text={type}
                />
            ))}
            <li
                className={"btn-group"}
                style={{gap: 0}}
            >
                <button
                    className={"btn btn-secondary btn-sm dropdown-toggle"}
                    type={"button"}
                    data-toggle={"dropdown"}
                >
                    <span className={"fa-solid fa-nopad fa-lg fa-caret-down"}/>
                </button>
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
                    {Object.keys(TicketTypes)
                        .sort((a, b) => a.localeCompare(b))
                        .map(typeName => (
                            <li key={typeName}>
                                <a
                                    className={"dropdown-item"}
                                    href={"#"}
                                    onClick={() => setType(typeName as TicketType)}
                                >
                                    {typeName}
                                </a>
                            </li>
                        ))}
                </ul>
            </li>
        </TDXButtonGroup>
    )
}