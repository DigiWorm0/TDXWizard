import confirmAction from "../../utils/confirmAction";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import AppID from "../../types/AppID";
import {GM_setClipboard} from "$";
import useSettings from "../../hooks/useSettings";
import TicketTypes from "../../db/TicketTypes";
import useMyUser from "../../hooks/useMyUser";
import useAsset from "../../hooks/useAsset";

export default function SurplusTicketButton() {
    const [settings] = useSettings();
    const myUser = useMyUser();
    const asset = useAsset();

    const onClick = async () => {
        if (confirmAction("Make a surplus ticket for this asset?")) {
            const client = new UWStoutTDXClient();

            // Get Asset Info
            if (!asset)
                throw new Error("Asset not found");

            // Create Ticket
            const newTicket = await client.tickets.createTicket(
                AppID.Tickets,
                {
                    TypeID: TicketTypes["Surplus"],
                    Title: "Device Surplus Requested",
                    Description: `Surplussing ${asset.Tag} (In PC-Repair)`,
                    AccountID: 2474, // NONE
                    StatusID: 195, // In Process
                    PriorityID: 64, // Medium
                    RequestorUid: myUser?.UID,
                    ResponsibleGroupID: 320, // PC Repair
                    SourceID: 193, // Tech Created
                },
                {
                    EnableNotifyReviewer: false,
                    NotifyRequestor: false,
                    NotifyResponsible: false,
                    AllowRequestorCreation: false
                }
            );

            // Add Asset to Ticket
            await client.assets.addAssetToTicket(
                AppID.Inventory,
                asset.ID,
                newTicket.ID
            );

            // Copy Surplus Excel to Clipboard
            const surplusRow = `${asset.Tag}\t${settings.technicianInitials}\t${newTicket.ID}\t${settings.technicianInitials}`;
            GM_setClipboard(surplusRow, "text");

            // Navigate to Ticket
            window.open(
                `/TDNext/Apps/${AppID.Tickets}/Tickets/TicketDet.aspx?TicketID=${newTicket.ID}`,
                "newticket",
                "width=800,height=600"
            );

            // Refresh/Close Page
            if (settings.autoCloseTicketOnSave)
                window.close();
            else
                window.location.reload();
        }
    }

    if (asset?.StatusID !== 27 || !settings.showSurplusButtons)
        return null;
    return (
        <button
            type={"button"}
            className={"btn btn-secondary btn-sm"}
            style={{margin: "0px 3px"}}
            title={"Create Surplus Ticket"}
            onClick={onClick}
        >
            <span className={"fa fa-solid fa-ticket fa-nopad"}/>
            <span className={"hidden-xs padding-left-xs"}>Surplus Ticket</span>
        </button>
    )
}