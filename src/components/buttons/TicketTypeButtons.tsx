import TicketType from "../../types/TicketType";
import ticketTypeNames from "../../db/TicketTypeNames";
import React from "react";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import findTicketTypes from "../../utils/ticketType/findTicketTypes";
import StatusClass from "../../tdx-api/types/StatusClass";
import getSettings from "../../hooks/settings/getSettings";

export default function TicketTypeButtons() {
    const [types, setTypes] = React.useState<TicketType[] | undefined>(undefined);

    React.useEffect(() => {

        // API Client
        const client = new UWStoutTDXClient();

        // Get Ticket ID
        const ticketID = getTicketIDFromURL();
        if (!ticketID)
            throw new Error("Ticket ID not found");

        // Get Ticket Info
        client.tickets.getTicket(43, ticketID).then((ticketInfo) => {

            // Check if type is set
            if (ticketInfo.TypeCategoryName !== "General")
                return;
            if (ticketInfo.StatusClass === StatusClass.Cancelled)
                return;

            // Get the possible ticket types
            const types = findTicketTypes(ticketInfo);
            setTypes(types);
        }).catch(console.error);
    }, []);

    const setType = async (type: TicketType) => {
        console.log("Setting Type: " + type);

        // API Client
        const client = new UWStoutTDXClient();

        // Get Ticket ID
        const ticketID = getTicketIDFromURL();
        if (!ticketID)
            throw new Error("Ticket ID not found");

        // Get Ticket Info
        const ticketInfo = await client.tickets.getTicket(43, ticketID);
        console.log(ticketInfo);

        // Edit Ticket
        const res = await client.tickets.editTicket(43, ticketID, {
            ...ticketInfo,
            TypeID: type
        });
        console.log(res);

        // Reload/Close the page
        if (getSettings().autoCloseTicketOnSave)
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

        // Get Ticket Info
        const ticketInfo = await client.tickets.getTicket(43, ticketID);
        console.log(ticketInfo);

        // Edit Ticket
        const res = await client.tickets.editTicket(43, ticketID, {
            ...ticketInfo,
            StatusID: 198, // Cancelled
        });
        console.log(res);

        // Reload/Close the page
        if (getSettings().autoCloseTicketOnSave)
            window.close();
        else
            window.location.reload();
    }

    return (
        <div
            className={"btn-group"}
            style={{margin: "0px 3px"}}
        >
            {types?.map(type => (
                <button
                    key={type}
                    type={"button"}
                    className={"btn btn-warning btn-sm"}
                    onClick={() => setType(type)}
                >
                    <span className={"fa fa-solid fa-nopad fa-tag"}/>
                    <span className={"hidden-xs padding-left-xs"}>
                        {ticketTypeNames[type]}
                    </span>
                </button>
            ))}
            {types !== undefined && (
                <li className={"btn-group"}>
                    <button
                        className={"btn btn-warning btn-sm dropdown-toggle"}
                        type={"button"}
                        data-toggle={"dropdown"}
                    >
                        <span className={"fa-solid fa-nopad fa-lg fa-caret-down"}/>
                    </button>
                    <ul className={"dropdown-menu"}>
                        <li>
                            <a
                                className={"dropdown-item"}
                                href={"#"}
                                onClick={setSpam}
                            >
                                Spam
                            </a>
                        </li>
                        <li className={"divider"}/>
                        {Object.keys(ticketTypeNames)
                            .sort((a, b) => ticketTypeNames[parseInt(a) as TicketType].localeCompare(ticketTypeNames[parseInt(b) as TicketType]))
                            .map(type => (
                                <li key={type}>
                                    <a
                                        className={"dropdown-item"}
                                        href={"#"}
                                        onClick={() => setType(parseInt(type))}
                                    >
                                        {ticketTypeNames[parseInt(type) as TicketType]}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </li>
            )}
        </div>
    )
}