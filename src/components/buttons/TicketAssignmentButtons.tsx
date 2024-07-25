import React from "react";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import Guid from "../../tdx-api/types/Guid";
import useSettings from "../../hooks/useSettings";
import useTicket from "../../hooks/useTicket";
import AppID from "../../types/AppID";

interface TicketAssignment {
    uid?: Guid;
    name?: string;
}

export default function TicketAssignmentButtons() {
    const ticket = useTicket();
    const [settings] = useSettings();

    const assignments = React.useMemo(() => {

        // Check if ticket is loaded
        if (!ticket)
            return null;

        // Check if assignment is set
        if (ticket.ResponsibleUid)
            return [];

        // Get the possible ticket assignments
        let newAssignments: TicketAssignment[] = [
            {uid: ticket.CompletedUid, name: ticket.CompletedFullName},
            {uid: ticket.ModifiedUid, name: ticket.ModifiedFullName},
            {uid: ticket.RespondedUid, name: ticket.RespondedFullName},
            {uid: ticket.CreatedUid, name: ticket.CreatedFullName},
        ];
        console.log(newAssignments);

        // Filter out the undefined, system, and duplicates
        newAssignments = newAssignments.filter(assignment => assignment.uid && /\S/.test(assignment.name ?? ""));
        newAssignments = newAssignments.filter(assignment => assignment.name !== "Email Monitor");
        newAssignments = newAssignments.filter((assignment, index) => newAssignments.findIndex(a => a.uid === assignment.uid) === index);

        return newAssignments;
    }, [ticket]);

    const setAssignment = async (assignment: TicketAssignment) => {
        console.log("Setting Assignment: " + assignment);

        // API Client
        const client = new UWStoutTDXClient();

        // Get Ticket ID
        const ticketID = getTicketIDFromURL();
        if (!ticketID)
            throw new Error("Ticket ID not found");

        // Update Ticket
        const res = await client.tickets.updateTicket(AppID.Tickets, ticketID, {ResponsibleUid: assignment.uid});
        console.log(res);

        // Reload/Close the page
        if (settings.autoCloseTicketOnSave)
            window.close();
        else
            window.location.reload();
    }

    return (
        <div
            className={"btn-group"}
            style={{margin: "0px 3px"}}
        >
            {assignments?.map(assignment => (
                <button
                    key={assignment.uid}
                    type={"button"}
                    className={"btn btn-warning btn-sm"}
                    title={`Assign to ${assignment.name}`}
                    onClick={() => setAssignment(assignment)}
                >
                    <span className={"fa fa-solid fa-nopad fa-user"}/>
                    <span className={"hidden-xs padding-left-xs"}>
                        {assignment.name}
                    </span>
                </button>
            ))}
        </div>
    )
}