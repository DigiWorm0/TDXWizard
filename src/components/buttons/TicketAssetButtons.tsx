import React from "react";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import useSettings from "../../hooks/useSettings";
import useTicket from "../../hooks/useTicket";
import AppID from "../../types/AppID";
import useTicketAssets from "../../hooks/useTicketAssets";
import useTicketFeed from "../../hooks/useTicketFeed";

const REGEX_LIST = [
    /\b[Cc]-?\d{4,5}\b/g, // C-Number
    /\b20\d{7}\b/g // Asset Tag
];

export default function TicketAssetButtons() {
    const ticket = useTicket();
    const ticketAssets = useTicketAssets();
    const feed = useTicketFeed();
    const [settings] = useSettings();

    console.log(ticketAssets);

    const ticketAssetNames = React.useMemo(() => {
        if (!ticket)
            return null;
        if (!settings.showTicketAssetButtons)
            return null;

        // Asset Search
        let assetNames: string[] = [];
        const searchAssets = (text: string) => {
            REGEX_LIST.forEach(regex => {
                const matches = text.match(regex);
                if (matches)
                    assetNames = [...assetNames, ...matches];
            });
        }

        // Search Each Field
        searchAssets(ticket.Title);
        searchAssets(ticket.Description);
        feed?.forEach(feedItem => searchAssets(feedItem.Body || ""));

        // Fix C- Prefix
        assetNames = assetNames.map(assetName => assetName.replace(/[Cc]-?/, "C-"));

        // Remove duplicates
        assetNames = [...new Set(assetNames)];

        // Remove existing assets
        if (ticketAssets)
            assetNames = assetNames.filter(asset => !ticketAssets.find(ticketAsset => ticketAsset.Name?.includes(asset)));

        return assetNames;
    }, [ticket, ticketAssets]);

    const addAsset = async (assetName: string) => {
        try {

            // API Client
            const client = new UWStoutTDXClient();

            // Get Ticket ID
            const ticketID = getTicketIDFromURL();
            if (!ticketID)
                throw new Error("Ticket ID not found");

            // Find Asset ID
            const appID = assetName.startsWith("C") ? AppID.Inventory : AppID.EStoutInventory;
            const assets = await client.assets.searchAssets(appID, {SerialLike: assetName, MaxResults: 1});
            if (assets.length === 0)
                throw new Error("Asset not found");
            const assetID = assets[0].ID;

            // Update Ticket
            await client.assets.addAssetToTicket(appID, assetID, ticketID);

            // Reload/Close the page
            if (settings.autoCloseTicketOnSave)
                window.close();
            else
                window.location.reload();
        }
        catch (err: any) {
            console.error(err);
            alert(err?.message || "An error occurred");
        }
    }

    return (
        <div
            className={"btn-group"}
            style={{margin: "0px 3px"}}
        >
            {ticketAssetNames?.map(assetName => (
                <button
                    key={assetName}
                    type={"button"}
                    className={"btn btn-warning btn-sm"}
                    onClick={() => addAsset(assetName)}
                >
                    <span className={"fa fa-solid fa-nopad fa-laptop"}/>
                    <span className={"hidden-xs padding-left-xs"}>
                        {assetName}
                    </span>
                </button>
            ))}
        </div>
    )
}