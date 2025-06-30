import React from "react";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import useSettings from "../../hooks/useSettings";
import useTicket from "../../hooks/useTicket";
import useUser from "../../hooks/useUser";
import User from "../../tdx-api/types/User";
import groupNames from "../../db/GroupNames";
import confirmAction from "../../utils/confirmAction";
import getAppIDFromURL from "../../utils/tdx/getAppIDFromURL";
import TDXButton from "./common/TDXButton";
import TDXButtonGroup from "./common/TDXButtonGroup";


export default function TicketAssignmentButtons() {
    const ticket = useTicket();
    const [settings] = useSettings();

    const requestor = useUser(ticket?.RequestorUid ?? "");
    const responder = useUser(ticket?.RespondedUid ?? "");
    const creator = useUser(ticket?.CreatedUid ?? "");
    const modifier = useUser(ticket?.ModifiedUid ?? "");

    const userList = React.useMemo(() => [
        requestor,
        responder,
        creator,
        modifier
    ], [requestor, responder, creator, modifier]);

    const shouldHide = React.useMemo(() => {
        if (!ticket)
            return true;

        // Check if disabled
        if (!settings.showTicketAssignButtons)
            return true;

        // Check if assignment is set
        const isAssigned = ticket.ResponsibleUid !== null;
        if (isAssigned && settings.hideAssignButtonsIfAssigned)
            return true;

        // Check if ticket is resolved/closed
        const isClosed = ticket.StatusName === "Resolved" || ticket.StatusName === "Closed" || ticket.StatusName === "Canceled";
        if (!isClosed && settings.hideAssignButtonsIfOpen)
            return true;

        // Check if all users are loaded
        if (userList.some(user => user === undefined))
            return true;

        return false;
    }, [ticket, userList, settings]);

    const assignments = React.useMemo(() => {
        if (shouldHide)
            return [];
        let newAssignments = [...userList];

        // Filter out the null/undefined assignments
        newAssignments = newAssignments.filter(assignment => assignment !== null && assignment !== undefined);

        // Filter out email monitor
        newAssignments = newAssignments.filter(assignment => assignment?.FullName !== "Email Monitor");

        // Filter out the current assignment
        newAssignments = newAssignments.filter(assignment => assignment?.UID !== ticket?.ResponsibleUid);

        // Filter out duplicates
        newAssignments = newAssignments.filter((assignment, index, self) => self.findIndex(a => a?.UID === assignment?.UID) === index);

        // Filter out non-employees
        newAssignments = newAssignments.filter(assignment => assignment?.SecurityRoleName !== "Client");

        return newAssignments as User[];
    }, [ticket, userList]);

    const setAssignment = async (assignment: User) => {
        if (confirmAction(`Assign to ${assignment.FullName}?`)) {
            console.log("Setting Assignment: " + assignment);

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

            // Update Ticket
            await client.tickets.updateTicket(appID, ticketID, {ResponsibleUid: assignment.UID});

            // Reload/Close the page
            if (settings.autoCloseTicketOnSave)
                window.close();
            else
                window.location.reload();
        }
    }

    const setGroup = async (groupID: number) => {
        if (confirmAction(`Assign to ${groupNames[groupID]}?`)) {

            // API Client
            const client = new UWStoutTDXClient();

            // Check if ticket is loaded
            if (!ticket)
                throw new Error("Ticket not loaded");

            // Update Ticket
            await client.tickets.updateTicket(ticket.AppID, ticket.ID, {
                ResponsibleGroupID: groupID,
                ResponsibleUid: undefined
            });

            // Reload/Close the page
            if (settings.autoCloseTicketOnSave)
                window.close();
            else
                window.location.reload();
        }
    }

    if (shouldHide)
        return null;
    return (
        <TDXButtonGroup>
            {assignments?.map(assignment => (
                <TDXButton
                    key={assignment.UID}
                    intent={"secondary"}
                    onClick={() => setAssignment(assignment)}
                    noMargin
                    icon={"fa fa-solid fa-nopad fa-user"}
                    text={assignment.FullName}
                />
            ))}

            <li className={"btn-group"}>
                <button
                    className={"btn btn-secondary btn-sm dropdown-toggle"}
                    type={"button"}
                    data-toggle={"dropdown"}
                    style={{marginRight: 0}}
                >
                    <span className={"fa-solid fa-nopad fa-lg fa-caret-down"}/>
                </button>
                <ul className={"dropdown-menu"}>
                    {Object.keys(groupNames)
                        .map(Number)
                        .sort((a, b) => groupNames[a].localeCompare(groupNames[b]))
                        .map(id => (
                            <li key={id}>
                                <a
                                    className={"dropdown-item"}
                                    href={"#"}
                                    onClick={() => setGroup(id)}
                                >
                                    {groupNames[id]}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </li>
        </TDXButtonGroup>
    )
}