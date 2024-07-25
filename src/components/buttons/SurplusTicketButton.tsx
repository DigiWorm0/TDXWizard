import confirmAction from "../../utils/confirmAction";
import UWStoutTDXClient from "../../utils/UWStoutTDXClient";
import getAssetIDFromURL from "../../utils/tdx/getAssetIDFromURL";
import AppID from "../../types/AppID";
import TicketType from "../../types/TicketType";
import {GM_notification, GM_setClipboard} from "$";
import getSettings from "../../hooks/settings/getSettings";

export default function SurplusTicketButton() {
    const onClick = async () => {
        if (confirmAction("Make a surplus ticket for this asset?")) {
            const client = new UWStoutTDXClient();

            // Get Asset Info
            const assetID = getAssetIDFromURL();
            if (!assetID)
                throw new Error("AssetID not found");
            const assetInfo = await client.assets.getAsset(44, assetID);

            // Create Ticket
            const newTicket = await client.tickets.createTicket(
                AppID.Tickets,
                {
                    TypeID: TicketType.Surplus,
                    Title: "Device Surplus Requested",
                    Description: `Surplussed device ${assetInfo.Tag} (In PC-Repair) - ` +
                        "Device has been secure-erased, BIOS password removed, inventory updated, and Windows 11 installed. Sending to surplus...",
                    AccountID: 2090, // Infrustructure Services
                    StatusID: 196, // Resolved
                    PriorityID: 64, // Medium
                    RequestorUid: "59a770dc-058c-ed11-ac20-0050f2f4deeb", // Margaret Kralewski
                    SourceID: 193, // Tech Created
                },
                {
                    EnableNotifyReviewer: false,
                    NotifyRequestor: false,
                    NotifyResponsible: false,
                    AllowRequestorCreation: false
                }
            );
            console.log(newTicket);

            // Add Asset to Ticket
            const assetRes = await client.assets.addAssetToTicket(
                AppID.Inventory,
                assetID,
                newTicket.ID
            );
            console.log(assetRes);

            // Copy Surplus Excel to Clipboard
            const surplusRow = `${assetInfo.Tag}\tAK\t${newTicket.ID}\tAK`;
            GM_setClipboard(surplusRow, "text");
            GM_notification(
                "The excel row has been copied to your clipboard. Don't forget to paste it into the Surplus Excel!",
                "Surplus Processed Successfully"
            );

            // Navigate to Ticket
            window.open(
                `/TDNext/Apps/${AppID.Tickets}/Tickets/TicketDet.aspx?TicketID=${newTicket.ID}`,
                "newticket",
                "width=800,height=600"
            );

            // Refresh/Close Page
            if (getSettings().autoCloseTicketOnSave)
                window.close();
            else
                window.location.reload();
        }
    }

    return (
        <button
            type={"button"}
            className={"btn btn-warning btn-sm"}
            style={{margin: "0px 3px"}}
            title={"Create Surplus Ticket"}
            onClick={onClick}
        >
            <span className={"fa fa-solid fa-ticket fa-nopad"}/>
            <span className={"hidden-xs padding-left-xs"}>Surplus Ticket</span>
        </button>
    )
}