import NewWindow from "react-new-window";
import React from "react";
import Asset from "../../tdx-api/types/Asset";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import autoRetryHTTPRequest from "../../utils/autoRetryHTTPRequest";
import BulkInventoryAssetRow from "./BulkInventoryAssetRow";
import updateAssets from "../../utils/assets/updateAssets";
import createTicketWithAssets from "../../utils/assets/createTicketWithAssets";
import createAssetsCSV from "../../utils/assets/createAssetsCSV";
import AppID from "../../types/AppID";

export interface BulkInventoryModalProps {
    onClose: () => void;
    appID?: number;
}

export default function BulkInventoryModal(props: BulkInventoryModalProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [assets, setAssets] = React.useState<Asset[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    const handleError = (err: Error) => {
        console.error(err);
        setError(existingErrors => {
            if (!existingErrors)
                return err.message;
            return `${existingErrors}\n${err.message}`;
        });
    }

    const handleInput = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== "Enter")
            return;
        if (e.ctrlKey || e.shiftKey || e.altKey)
            return;
        if (isLoading)
            return;
        e.preventDefault();

        // Update state
        setIsLoading(true);

        // Get the search query
        const inputValue = e.currentTarget.value.trim();
        let searchQueries = inputValue.split("\n");

        // Remove Whitespace
        searchQueries = searchQueries
            .map(query => query.trim())
            .filter(query => query.length > 0);

        // Remove S prefix
        searchQueries = searchQueries.map(query => {
            if (query.startsWith("S"))
                return query.slice(1);
            return query;
        });

        // Clear Input
        e.currentTarget.value = "";

        // Iterate over each search query
        for (const searchQuery of searchQueries) {

            // Search for the asset
            await searchAsset(searchQuery).catch((err) => {
                err.message += ` (${searchQuery})`;
                handleError(err);
            });
        }

        // Update state
        setIsLoading(false);
    }

    const searchAsset = async (searchQuery: string) => {

        // Send API request
        const client = new UWStoutTDXClient();
        const {appID} = props;
        // const appID = getAppIDFromURL();

        if (!appID)
            throw new Error("App ID not found");

        const searchResults = await autoRetryHTTPRequest(
            () => client.assets.searchAssets(appID, {SerialLike: searchQuery, MaxResults: 1}),
            30000,
            3,
            (retries) => handleError(new Error(`Rate limit exceeded. Retrying in 30s... (${retries}/3)`))
        );

        // Check Results
        if (searchResults.length === 0)
            throw new Error("Asset not found");
        const asset = searchResults[0];

        // Set the asset
        setAssets(existingAssets => {
            // Check if the asset is already in the list
            if (existingAssets.find(a => a.ID === asset.ID)) {
                handleError(new Error(`Duplicate asset already in list: ${asset.Tag} (${searchQuery})`));
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

        // Update state
        setIsLoading(true);
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
        setIsLoading(false);
        setAssets(newAssets);
    }

    return (
        <NewWindow
            title={"Bulk Inventory"}
            onUnload={props.onClose}
            features={{width: 900, height: 600}}
            onOpen={(e) => {
                e.window.document.body.classList.add("wizard_window");
            }}
        >
            <div style={{padding: 15}}>
                <h1 style={{marginBottom: 5}}>
                    Assets ({assets.length})
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

                    <tbody>
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

                    {isLoading && (
                        <tr>
                            <td colSpan={6} className={"text-center"}>
                                <div className={"progress"} style={{marginBottom: 0}}>
                                    <div
                                        className={"progress-bar progress-bar-striped progress-bar-animated active w-100"}
                                    />
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <textarea
                    autoFocus
                    className={"form-control"}
                    placeholder={"Scan/type an asset tag OR paste a column/list of asset tags"}
                    onKeyDown={handleInput}
                    style={{
                        marginTop: 5,
                        height: 50,
                        minWidth: "100%",
                        maxWidth: "100%",
                    }}
                />

                <div
                    className={"tdx-btn tdx-btn--secondary"}
                    onClick={() => updateAssets(props.appID ?? AppID.Inventory, assets)}
                    style={{marginTop: 5, marginLeft: 0}}
                    // disabled={assets.length === 0}
                >
                    Update All Assets
                </div>

                <div
                    className={"tdx-btn tdx-btn--secondary"}
                    onClick={() => createTicketWithAssets(props.appID ?? AppID.Inventory, assets)}
                    style={{marginTop: 5, marginLeft: 5}}
                    // disabled={assets.length === 0}
                >
                    Create Ticket
                </div>

                <div
                    className={"tdx-btn tdx-btn--secondary"}
                    onClick={() => createAssetsCSV(assets)}
                    style={{marginTop: 5, marginLeft: 5}}
                    // disabled={assets.length === 0}
                >
                    Download CSV
                </div>

                <div
                    className={"tdx-btn tdx-btn--secondary"}
                    onClick={() => refreshAssets()}
                    style={{marginTop: 5, marginLeft: 5}}
                    // disabled={assets.length === 0 || isLoading}
                >
                    Reload Assets
                </div>

                {error && (
                    <div
                        className={"alert alert-danger alert-dismissible fade show"}
                        style={{marginTop: 5}}
                    >

                        {error.split("\n").map((line, i) => (
                            <span key={i}>
                                {line}<br/>
                            </span>
                        ))}

                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setError(null)}
                        />
                    </div>
                )}
            </div>
        </NewWindow>
    )
}
