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
import BigInputWindow from "../BigInputWindow";

export interface BulkInventoryModalProps {
    onClose: () => void;
    appID?: number;
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
        // const appID = getAppIDFromURL();

        if (!appID)
            throw new Error("App ID not found");

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

            <button
                className={"tdx-btn tdx-btn--secondary"}
                onClick={() => updateAssets(props.appID ?? AppID.Inventory, assets)}
                style={{marginTop: 5, marginLeft: 0}}
                disabled={assets.length === 0 || isLoading}
            >
                <i className={"fa fa-pen-to-square"}></i>
                <span className={"hidden-xs padding-left-xs"}>Update All Assets</span>
            </button>

            <button
                className={"tdx-btn tdx-btn--secondary"}
                onClick={() => createTicketWithAssets(props.appID ?? AppID.Inventory, assets)}
                style={{marginTop: 5, marginLeft: 5}}
                disabled={assets.length === 0 || isLoading}
            >
                <i className={"fa fa-ticket"}></i>
                <span className={"hidden-xs padding-left-xs"}>New Ticket</span>
            </button>

            <button
                className={"tdx-btn tdx-btn--secondary"}
                onClick={() => createAssetsCSV(assets)}
                style={{marginTop: 5, marginLeft: 5}}
                disabled={assets.length === 0 || isLoading}
            >
                <i className={"fa fa-table"}></i>
                <span className={"hidden-xs padding-left-xs"}>Download CSV</span>
            </button>

            <button
                className={"tdx-btn tdx-btn--secondary"}
                onClick={() => runPromise(refreshAssets())}
                style={{marginTop: 5, marginLeft: 5}}
                disabled={assets.length === 0 || isLoading}
            >
                <i className={"fa fa-arrows-rotate"}></i>
                <span className={"hidden-xs padding-left-xs"}>Reload Assets</span>
            </button>

            <BigWindowError
                error={errors}
                onClear={clearErrors}
            />
        </BigInputWindow>
    )
}
