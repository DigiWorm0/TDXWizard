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
import SurplusAssetsButton from "../../buttons/SurplusAssetsButton";
import useErrorHandling from "../../../hooks/useErrorHandling";
import useRunPromise from "../../../hooks/useRunPromise";


export interface SurplusAsset extends Asset {
    surplusTickets: Ticket[];
}

export interface BulkInventoryModalProps {
    onClose: () => void;
}

const SURPLUS_FORM_ID = 1061; // Surplus Form ID

export default function SurplusManagerModal(props: BulkInventoryModalProps) {
    const [assets, setAssets] = React.useState<SurplusAsset[]>([]);
    const [errors, onError, clearErrors] = useErrorHandling();
    const [runPromise, isLoading] = useRunPromise(onError);

    const onSearch = async (searchQuery: string[]) => {
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

    return (
        <BigInputWindow
            title={"Bulk Inventory"}
            onClose={props.onClose}
        >
            <h1 style={{marginBottom: 5}}>
                Surplus
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
                        Status
                    </th>
                    <th>
                        Ticket
                    </th>
                    <th>
                    </th>
                </tr>
                </thead>

                <tbody>
                {assets.map(asset => (
                    <SurplusManagerTableRow
                        key={asset.ID}
                        asset={asset}

                        onRemove={() => removeAsset(asset)}
                        disabled={isLoading}
                    />
                ))}
                </tbody>
            </table>

            {isLoading && <BigWindowProgress/>}
            <BigWindowInput
                onSearch={(queries) => runPromise(onSearch(queries))}
                disabled={isLoading}
            />

            <SurplusAssetsButton
                assets={assets}
                disabled={isLoading || assets.length === 0}
            />

            <BigWindowError
                error={errors}
                onClear={clearErrors}
            />
        </BigInputWindow>
    )
}
