import React from "react";
import Asset from "../../../tdx-api/types/Asset";
import UWStoutTDXClient from "../../../utils/tdx/UWStoutTDXClient";
import autoRetryHTTPRequest from "../../../utils/autoRetryHTTPRequest";
import Ticket from "../../../tdx-api/types/Ticket";
import AppID from "../../../types/AppID";
import BigInputWindow from "../bigwindow/BigInputWindow";
import BigWindowInput from "../bigwindow/BigWindowInput";
import BigWindowError from "../bigwindow/BigWindowError";
import BigWindowProgress from "../bigwindow/BigWindowProgress";
import SurplusManagerTableRow from "./SurplusManagerTableRow";
import useErrorHandling from "../../../hooks/useErrorHandling";
import useRunPromise from "../../../hooks/useRunPromise";
import useTicketStatusID from "../../../hooks/useTicketStatusID";
import TDXButton from "../../buttons/common/TDXButton";
import createAssetsCSV from "../../../utils/assets/createAssetsCSV";
import TicketTypes from "../../../db/TicketTypes";
import StatusClass from "../../../tdx-api/types/StatusClass";
import {GM_setClipboard} from "$";
import useMyUser from "../../../hooks/useMyUser";
import BigWindowInfo from "../bigwindow/BigWindowInfo";
import toast from "react-hot-toast";

export interface SurplusAsset extends Asset {
    surplusTickets: Ticket[];
}

export interface BulkInventoryModalProps {
    onClose: () => void;
}

const SURPLUS_FORM_ID = 1061; // Surplus Form ID
const SURPLUS_STATUS_ID = 27; // Surplus Status ID
const SURPLUS_DEPARTMENT_ID = 3484; // Surplus Department ID
const PICKED_UP_ATTRIBUTE_ID = 14087;
const PICKED_UP_YES_VALUE = "41587"; // Yes Value for Picked Up Attribute

export default function SurplusManagerModal(props: BulkInventoryModalProps) {
    const [assets, setAssets] = React.useState<SurplusAsset[]>([]);
    const [errors, onError, clearErrors] = useErrorHandling();
    const [runPromise, isLoading] = useRunPromise(onError);
    const myUser = useMyUser();
    const inProgressID = useTicketStatusID("In Progress");
    const resolvedID = useTicketStatusID("Resolved");

    const onSearch = async (searchQuery: string[]) => {
        // Search each asset
        for (const query of searchQuery)
            await searchAsset(query);
    }

    const searchSurplusTickets = async (asset: Asset) => {
        const client = new UWStoutTDXClient();

        // Search for the ticket
        const ticketResults = await runHTTPRequest(() => client.tickets.search(
            AppID.Tickets,
            {ConfigurationItemIDs: [asset.ConfigurationItemID]}
        ));
        const surplusTickets = ticketResults.filter(ticket => ticket.FormID === SURPLUS_FORM_ID);

        for (let i = 0; i < surplusTickets.length; i++)
            surplusTickets[i] = await client.tickets.getTicket(AppID.Tickets, surplusTickets[i].ID);

        return surplusTickets;
    }

    const searchAsset = async (searchQuery: string) => {
        const client = new UWStoutTDXClient();

        // Search for the asset
        const searchResults = await runHTTPRequest(() => client.assets.searchAssets(
            AppID.Inventory,
            {SerialLike: searchQuery, MaxResults: 1}
        ));

        if (searchResults.length === 0)
            throw new Error("Asset not found");
        const asset = searchResults[0];
        const surplusTickets = await searchSurplusTickets(asset);

        // Set the asset
        setAssets(existingAssets => {
            // Check if the asset is already in the list
            if (existingAssets.find(a => a.ID === asset.ID)) {
                onError(`Duplicate asset already in list: ${asset.Tag} (${searchQuery})`);
                return existingAssets;
            }

            // Add the asset to the list
            return [...existingAssets, {
                ...asset,
                surplusTickets
            }];
        });
    }

    const removeAsset = (asset: SurplusAsset) => {
        setAssets(existingAssets => existingAssets.filter(a => a.ID !== asset.ID));
    }

    const refreshAllAssets = async () => {
        // Clear the current assets
        setAssets([]);

        // Search each asset
        for (const asset of assets)
            await searchAsset(asset.SerialNumber ?? asset.ID.toString());
    }

    const runHTTPRequest = <T, >(request: () => Promise<T>) => {
        return autoRetryHTTPRequest(request, 30000, 3, (retries) => {
            onError(`Rate limit exceeded. Retrying in 30s... (${retries}/3)`);
        });
    }

    const surplusAllAssets = async () => {
        const client = new UWStoutTDXClient();

        // Update Each Asset
        for (const asset of assets) {

            // Fetch Asset
            const assetData = await runHTTPRequest(() => client.assets.getAsset(AppID.Inventory, asset.ID));
            if (!assetData)
                continue;

            await runHTTPRequest(() => client.assets.editAsset(AppID.Inventory, asset.ID, {
                ...assetData,
                StatusID: SURPLUS_STATUS_ID,
                OwningDepartmentID: SURPLUS_DEPARTMENT_ID,
                OwningCustomerID: ""
            }));
        }

        // Refresh the asset list
        await refreshAllAssets();
    }

    const pickupAllTickets = async () => {
        const client = new UWStoutTDXClient();

        // Update Each Asset
        for (const asset of assets) {
            for (const ticket of asset.surplusTickets) {

                // Check if the ticket is already picked up
                const pickedUpAttribute = ticket.Attributes?.find(attr => attr.ID === PICKED_UP_ATTRIBUTE_ID);
                const isPickedUp = pickedUpAttribute?.Value === PICKED_UP_YES_VALUE;
                if (isPickedUp)
                    continue;


                // Mark ticket as picked up
                await runHTTPRequest(() => client.tickets.updateTicket(AppID.Tickets, ticket.ID, {
                    Attributes: ticket.Attributes?.map(attr => ({
                        ...attr,
                        Value: attr.ID === PICKED_UP_ATTRIBUTE_ID ? PICKED_UP_YES_VALUE : attr.Value
                    }))
                }));

                // Add a ticket feed comment
                await runHTTPRequest(() => client.tickets.addTicketFeed(AppID.Tickets, ticket.ID, {
                    NewStatusID: inProgressID ?? ticket.StatusID,
                    IsCommunication: true,
                    IsPrivate: true,
                    IsRichHtml: false,
                    Comments: "Device is in PC-Repair"
                }));
            }
        }

        // Refresh the asset list
        await refreshAllAssets();
    }

    const refreshAsset = async (asset: Asset) => {
        const client = new UWStoutTDXClient();

        // Fetch Asset + Surplus Tickets
        const newAsset = await client.assets.getAsset(AppID.Inventory, asset.ID);
        const surplusTickets = await searchSurplusTickets(newAsset);

        // Update React State
        setAssets(existingAssets =>
            existingAssets.map(a => a.ID === asset.ID ?
                {...newAsset, surplusTickets} : a
            )
        );
    }

    const makeSurplusTicket = async (asset: Asset) => {
        const client = new UWStoutTDXClient();

        // Make Ticket
        const ticket = await client.tickets.createTicket(
            AppID.Tickets,
            {
                FormID: SURPLUS_FORM_ID,
                TypeID: TicketTypes["Surplus"],
                Title: "Device Surplus Requested",
                Description: `Surplussing ${asset.Tag} (In PC-Repair)`,
                AccountID: 2474, // NONE
                StatusID: 195, // In Process
                PriorityID: 64, // Medium
                RequestorUid: "59a770dc-058c-ed11-ac20-0050f2f4deeb", // Labs
                ResponsibleGroupID: 320, // PC Repair
                SourceID: 193, // Tech Created
                Attributes: [
                    // Picked Up
                    {ID: PICKED_UP_ATTRIBUTE_ID, Value: PICKED_UP_YES_VALUE}
                ]
            }, {
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
            ticket.ID
        );

        // Refresh Asset
        await refreshAsset(asset);
    }

    const copyExcelPickup = () => {
        let clipboard = "";

        // Iterate through each asset
        for (const asset of assets) {

            // Find open ticket
            const ticket = asset.surplusTickets.find(t =>
                t.StatusClass !== StatusClass.Cancelled &&
                t.StatusClass !== StatusClass.Completed);
            if (!ticket) {
                toast.error(`No open surplus ticket found for asset ${asset.Tag}`, {toasterId: "surplus-manager"});
                return;
            }

            // Add excel row to clipboard
            const surplusRow = `${asset.Tag}\tAK\t${ticket.ID}\tAK`;
            clipboard += `${surplusRow}\n`;
        }

        // Set Clipboard
        GM_setClipboard(clipboard.trim(), "text");

        // Toast
        toast.success("Copied surplus pickup data to clipboard", {toasterId: "surplus-manager"});
    }

    const copyExcelCompleted = () => {
        let clipboard = "";

        const date = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });

        // Iterate through each asset
        for (const asset of assets) {

            // Add excel row to clipboard
            const surplusRow = `${asset.Tag}\tHP Z4 G4\tWindows 11\t${date}\tAK`;
            clipboard += `${surplusRow}\n`;
        }

        // Set Clipboard
        GM_setClipboard(clipboard.trim(), "text");

        // Toast
        toast.success("Copied surplus completed data to clipboard", {toasterId: "surplus-manager"});
    }

    const resolveAllTickets = async () => {
        const client = new UWStoutTDXClient();

        // Update Each Asset
        for (const asset of assets) {
            for (const ticket of asset.surplusTickets) {

                // Check if the ticket is already resolved
                const isResolved =
                    ticket.StatusClass === StatusClass.Cancelled ||
                    ticket.StatusClass === StatusClass.Completed;
                if (isResolved)
                    continue;

                // Add a ticket feed comment
                await runHTTPRequest(() => client.tickets.addTicketFeed(AppID.Tickets, ticket.ID, {
                    NewStatusID: ticket.StatusID,
                    IsCommunication: true,
                    IsPrivate: true,
                    IsRichHtml: false,
                    Comments: "Device has been secure-erased, BIOS password removed, inventory updated, and Windows 11 installed. Sending to surplus."
                }));

                // Resolve and assign to myself
                await runHTTPRequest(() => client.tickets.updateTicket(AppID.Tickets, ticket.ID, {
                    StatusID: resolvedID ?? ticket.StatusID,
                    ResponsibleUid: myUser?.UID ?? ticket.ResponsibleUid
                }));
            }
        }

        // Refresh the asset list
        await refreshAllAssets();
    }

    return (
        <BigInputWindow
            id={"surplus-manager"}
            title={"Surplus Manager"}
            onClose={props.onClose}
        >
            <h1
                className={"mb-1 fw-bold"}
            >
                <span className={"fa fa-recycle me-3"}/>
                Surplus Manager
            </h1>
            <table
                className={"table table-striped table-bordered table-hover"}
                style={{marginBottom: 0}}
            >
                <thead>
                <tr>
                    <th>
                        Asset Tag
                    </th>
                    <th>
                        Serial #
                    </th>
                    <th>
                        Model
                    </th>
                    <th>
                        Inventory
                    </th>
                    <th>
                        Surplus Ticket
                    </th>
                    <th>
                    </th>
                </tr>
                </thead>

                <tbody style={{borderTop: "none"}}>
                {assets.map(asset => (
                    <SurplusManagerTableRow
                        key={asset.ID}
                        asset={asset}

                        onRemove={() => removeAsset(asset)}
                        onRefresh={() => runPromise(refreshAsset(asset))}
                        onMakeTicket={() => runPromise(makeSurplusTicket(asset))}
                        disabled={isLoading}
                    />
                ))}

                {assets.length === 0 && !isLoading && (
                    <tr>
                        <td
                            colSpan={6}
                            className={"text-center text-muted fst-italic"}
                        >
                            Scan 1 or more asset tags to perform an action
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {isLoading && <BigWindowProgress/>}

            <BigWindowInput
                onSearch={(queries) => runPromise(onSearch(queries))}
                disabled={isLoading}
            />

            <div className={"mt-2"}>
                <TDXButton
                    type={"tdx"}
                    disabled={isLoading || assets.length === 0}
                    title={"Marks all assets as surplus inventory"}
                    onClick={() => runPromise(surplusAllAssets())}
                    icon={"fa fa-archive me-1"}
                    text={"Set Surplus Inventory"}
                />

                <TDXButton
                    type={"tdx"}
                    disabled={isLoading || assets.length === 0}
                    title={"Mark all tickets as picked up"}
                    onClick={() => runPromise(pickupAllTickets())}
                    icon={"fa fa-ticket me-1"}
                    text={"Pick Up Tickets"}
                />

                <TDXButton
                    type={"tdx"}
                    onClick={() => copyExcelPickup()}
                    disabled={assets.length === 0 || isLoading}
                    title={"Copy Excel for Surplus Spreadsheet"}
                    icon={"fa fa-clipboard me-1"}
                    text={"Copy Surplus Excel"}
                />
            </div>
            <div className={"mt-2"}>
                <TDXButton
                    type={"tdx"}
                    disabled={isLoading || assets.length === 0}
                    title={"Mark all tickets as resolved"}
                    onClick={() => runPromise(resolveAllTickets())}
                    icon={"fa fa-flag-checkered me-1"}
                    text={"Set Resolved"}
                />

                <TDXButton
                    type={"tdx"}
                    onClick={() => copyExcelCompleted()}
                    disabled={assets.length === 0 || isLoading}
                    title={"Copy Excel for Completed Surplus Spreadsheet"}
                    icon={"fa fa-clipboard me-1"}
                    text={"Copy Completed Surplus Excel"}
                />
            </div>
            <div className={"mt-2"}>
                <TDXButton
                    type={"tdx"}
                    disabled={isLoading || assets.length === 0}
                    title={"Refresh all assets"}
                    onClick={() => runPromise(refreshAllAssets())}
                    icon={"fa fa-refresh me-1"}
                    text={"Refresh"}
                />

                <TDXButton
                    type={"tdx"}
                    onClick={() => createAssetsCSV(assets)}
                    disabled={assets.length === 0 || isLoading}
                    title={"Download a CSV file of the assets"}
                    icon={"fa fa-table me-1"}
                    text={"Download CSV"}
                />

            </div>

            <BigWindowError
                error={errors}
                onClear={clearErrors}
            />

            <BigWindowInfo>
                This is a tool for PC-Repair to manage surplus inventory. It allows you to
                manage and perform each step of the surplus process for a single device or in bulk.
            </BigWindowInfo>
        </BigInputWindow>
    )
}
