import React from "react";
import Asset from "../../../tdx-api/types/Asset";
import UWStoutTDXClient from "../../../utils/tdx/UWStoutTDXClient";
import autoRetryHTTPRequest from "../../../utils/autoRetryHTTPRequest";
import BulkInventoryAssetRow from "./BulkInventoryAssetRow";
import updateAssets from "../../../utils/assets/updateAssets";
import createTicketWithAssets from "../../../utils/assets/createTicketWithAssets";
import createAssetsCSV from "../../../utils/assets/createAssetsCSV";
import AppID from "../../../types/AppID";
import useErrorHandling from "../../../hooks/useErrorHandling";
import useRunPromise from "../../../hooks/useRunPromise";
import BigWindowError from "../bigwindow/BigWindowError";
import BigWindowInput from "../bigwindow/BigWindowInput";
import BigWindowProgress from "../bigwindow/BigWindowProgress";
import BigInputWindow from "../bigwindow/BigInputWindow";
import TDXButton from "../../buttons/common/TDXButton";
import BigWindowInfo from "../bigwindow/BigWindowInfo";

export interface BulkInventoryModalProps {
    onClose: () => void;
    appID: number;
}

export default function BulkInventoryModal(props: BulkInventoryModalProps) {
    const [assets, setAssets] = React.useState<Asset[]>([]);
    const [errors, onError, clearErrors] = useErrorHandling();
    const [runPromise, isLoading] = useRunPromise(onError);

    const onSearch = async (searchQueries: string[]) => {

        // Remove S- prefix
        searchQueries = searchQueries.map(query => {
            if (query.startsWith("S"))
                return query.slice(1);
            return query;
        });

        // Search each asset
        for (const query of searchQueries)
            await searchAsset(query);
    }

    const searchAsset = async (searchQuery: string) => {

        // Send API request
        const client = new UWStoutTDXClient();
        const {appID} = props;

        if (!appID)
            throw new Error("App ID not found");

        // Search for the asset
        const searchResults = await autoRetryHTTPRequest(
            () => client.assets.searchAssets(appID, {SerialLike: searchQuery, MaxResults: 1}),
            30000,
            3,
            (retries) => onError(`Rate limit exceeded. Retrying in 30s... (${retries}/3)`)
        );

        // Check Results
        if (searchResults.length === 0)
            throw new Error("Asset not found");
        const asset = searchResults[0];

        // Set the asset
        setAssets(existingAssets => {
            // Check if the asset is already in the list
            if (existingAssets.find(a => a.ID === asset.ID)) {
                onError(`Duplicate asset already in list: ${asset.Tag} (${searchQuery})`);
                return existingAssets;
            }

            // Add the asset to the list
            return [...existingAssets, asset];
        });
    }

    const removeAsset = (asset: Asset) => {
        setAssets(assets.filter(a => a.ID !== asset.ID));
    }

    const refreshAssets = async () => {

        // Check if loading
        if (isLoading)
            return;

        // Clear assets
        setAssets([]);

        // Send API request
        const client = new UWStoutTDXClient();
        const {appID} = props;

        // Iterate over each asset
        const newAssets: Asset[] = [];
        for (const asset of assets) {
            const newAsset = await client.assets.getAsset(appID, asset.ID);
            newAssets.push(newAsset);
            setAssets([...newAssets]);
        }

        // Update state
        setAssets(newAssets);
    }

    return (
        <BigInputWindow
            id={"bulk-inventory"}
            title={"Bulk Inventory"}
            onClose={props.onClose}
        >
            <h1
                className={"mb-1 fw-bold"}
            >
                <span className={"fa fa-boxes me-3"}/>
                Bulk Inventory
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
                        Owner
                    </th>
                    <th>
                        Status
                    </th>
                </tr>
                </thead>

                <tbody style={{borderTop: "none"}}>

                {assets.map(asset => (
                    <BulkInventoryAssetRow
                        key={asset.ID}
                        asset={asset}
                        removeAsset={removeAsset}
                        appID={props.appID}
                    />
                ))}

                {assets.length === 0 && !isLoading && (
                    <tr>
                        <td colSpan={6} className={"text-center"}>
                                <span
                                    className={"text-muted"}
                                    style={{fontStyle: "italic"}}
                                >
                                    Scan an asset tag to add it to the list
                                </span>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {isLoading && <BigWindowProgress/>}

            <BigWindowInput
                onSearch={(queries) => runPromise(onSearch(queries))}
            />

            <div className={"mt-2"}>
                <TDXButton
                    type={"tdx"}
                    onClick={() => updateAssets(props.appID ?? AppID.Inventory, assets)}
                    disabled={assets.length === 0 || isLoading}
                    title={"Update all selected assets"}
                    icon={"fa fa-pen-to-square me-1"}
                    text={"Update All Assets"}
                />

                <TDXButton
                    type={"tdx"}
                    onClick={() => createTicketWithAssets(props.appID ?? AppID.Inventory, assets)}
                    disabled={assets.length === 0 || isLoading}
                    title={"Create a ticket with the selected assets"}
                    icon={"fa fa-ticket me-1"}
                    text={"Create Ticket"}
                />

                <TDXButton
                    type={"tdx"}
                    onClick={() => createAssetsCSV(assets)}
                    disabled={assets.length === 0 || isLoading}
                    title={"Download a CSV file of the assets"}
                    icon={"fa fa-table me-1"}
                    text={"Download CSV"}
                />

                <TDXButton
                    type={"tdx"}
                    onClick={() => runPromise(refreshAssets())}
                    disabled={assets.length === 0 || isLoading}
                    title={"Reload the assets from the server"}
                    icon={"fa fa-refresh me-1"}
                    text={"Reload Assets"}
                />
            </div>

            <BigWindowError
                error={errors}
                onClear={clearErrors}
            />

            <BigWindowInfo>
                This is a tool to manage large amounts of inventory assets at once.
                You can scan asset tags to add them to the list, and then update inventory,
                create tickets, or download a CSV.
            </BigWindowInfo>
        </BigInputWindow>
    )
}
