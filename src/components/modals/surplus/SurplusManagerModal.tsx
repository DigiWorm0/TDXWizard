import React from "react";
import Asset from "../../../tdx-api/types/Asset";
import UWStoutTDXClient from "../../../utils/tdx/UWStoutTDXClient";
import autoRetryHTTPRequest from "../../../utils/autoRetryHTTPRequest";
import Ticket from "../../../tdx-api/types/Ticket";
import AppID from "../../../types/AppID";
import BigInputWindow from "../BigInputWindow";
import BigWindowInput from "../bigwindow/BigWindowInput";
import BigWindowError from "../bigwindow/BigWindowError";
import BigWindowProgress from "../bigwindow/BigWindowProgress";
import SurplusManagerTableRow from "./SurplusManagerTableRow";
import useErrorHandling from "../../../hooks/useErrorHandling";
import useRunPromise from "../../../hooks/useRunPromise";
import confirmAction from "../../../utils/confirmAction";
import useTicketStatusID from "../../../hooks/useTicketStatusID";

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
    const inProgressID = useTicketStatusID("In Progress");

    const onSearch = async (searchQuery: string[]) => {
        // Search each asset
        for (const query of searchQuery)
            await searchAsset(query);
    }

    const searchAsset = async (searchQuery: string) => {
        const client = new UWStoutTDXClient();

        // Search for the asset
        const searchResults = await autoRetryHTTPRequest(
            () => client.assets.searchAssets(AppID.Inventory, {SerialLike: searchQuery, MaxResults: 1}),
            30000,
            3,
            (retries) => onError(`Rate limit exceeded. Retrying in 30s... (${retries}/3)`)
        );

        if (searchResults.length === 0)
            throw new Error("Asset not found");
        const asset = searchResults[0];

        // Search for the ticket
        const ticketResults = await autoRetryHTTPRequest(
            () => client.tickets.search(AppID.Tickets, {ConfigurationItemIDs: [asset.ConfigurationItemID]}),
            30000,
            3,
            (retries) => onError(`Rate limit exceeded. Retrying in 30s... (${retries}/3)`)
        );
        const surplusTickets = ticketResults.filter(ticket => ticket.FormID === SURPLUS_FORM_ID);

        for (let i = 0; i < surplusTickets.length; i++)
            surplusTickets[i] = await client.tickets.getTicket(AppID.Tickets, surplusTickets[i].ID);


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

    const surplusAllAssets = async () => {
        if (confirmAction("Mark these assets as surplus?")) {
            const client = new UWStoutTDXClient();

            // Update Each Asset
            for (const asset of assets) {
                await client.assets.editAsset(AppID.Inventory, asset.ID, {
                    ...asset,
                    StatusID: SURPLUS_STATUS_ID,
                    OwningDepartmentID: SURPLUS_DEPARTMENT_ID,
                    OwningCustomerID: ""
                });
            }

            // Refresh the asset list
            await refreshAllAssets();
        }
    }

    const pickupAllTickets = async () => {
        if (confirmAction("Mark all tickets as picked up?")) {
            const client = new UWStoutTDXClient();

            // Update Each Asset
            for (const asset of assets) {
                for (const ticket of asset.surplusTickets) {

                    // Mark ticket as picked up
                    await client.tickets.updateTicket(AppID.Tickets, ticket.ID, {
                        Attributes: ticket.Attributes?.map(attr => ({
                            ...attr,
                            Value: attr.ID === PICKED_UP_ATTRIBUTE_ID ? PICKED_UP_YES_VALUE : attr.Value
                        }))
                    });

                    // Add a ticket feed comment
                    await client.tickets.addTicketFeed(AppID.Tickets, ticket.ID, {
                        NewStatusID: inProgressID ?? ticket.StatusID,
                        IsCommunication: true,
                        IsPrivate: true,
                        IsRichHtml: false,
                        Comments: "Device is in PC-Repair"
                    });

                }
            }

            // Refresh the asset list
            await refreshAllAssets();
        }
    }

    return (
        <BigInputWindow
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
                        Ticket
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

            <button
                type={"button"}
                className={"tdx-btn tdx-btn--secondary"}
                style={{marginTop: 5, marginLeft: 5}}
                disabled={isLoading || assets.length === 0}
                title={"Marks all assets as surplus inventory"}
                onClick={() => runPromise(surplusAllAssets())}
            >
                <i className={"fa fa-archive"}></i>
                <span className={"hidden-xs padding-left-xs"}>Set Surplus Inventory</span>
            </button>

            <button
                type={"button"}
                className={"tdx-btn tdx-btn--secondary"}
                style={{marginTop: 5, marginLeft: 5}}
                disabled={isLoading || assets.length === 0}
                title={"Mark all tickets as picked up"}
                onClick={() => runPromise(pickupAllTickets())}
            >
                <i className={"fa fa-check"}></i>
                <span className={"hidden-xs padding-left-xs"}>Set Picked Up</span>
            </button>

            <button
                className={"tdx-btn tdx-btn--secondary"}
                onClick={() => runPromise(refreshAllAssets())}
                style={{marginTop: 5, marginLeft: 5}}
                disabled={isLoading || assets.length === 0}
            >
                <span className={"fa fa-refresh me-1"}/>
                Refresh
            </button>

            <BigWindowError
                error={errors}
                onClear={clearErrors}
            />
        </BigInputWindow>
    )
}
