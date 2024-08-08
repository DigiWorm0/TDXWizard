import NewWindow from "react-new-window";
import React from "react";
import Asset from "../../tdx-api/types/Asset";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import AppID from "../../types/AppID";
import autoRetryHTTPRequest from "../../utils/autoRetryHTTPRequest";
import BulkInventoryAssetRow from "./BulkInventoryAssetRow";

export interface BulkInventoryModalProps {
    onClose: () => void;
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

        const searchResults = await autoRetryHTTPRequest(
            () => client.assets.searchAssets(AppID.Inventory, {SerialLike: searchQuery, MaxResults: 1}),
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
            if (existingAssets.find(a => a.ID === asset.ID))
                return existingAssets;

            // Add the asset to the list
            return [...existingAssets, asset];
        });
    }

    const removeAsset = (asset: Asset) => {
        setAssets(assets.filter(a => a.ID !== asset.ID));
    }

    const updateAllAssets = () => {
        const assetIDs = assets.map(asset => asset.ID).join(",");
        const url = `${window.location.origin}/TDNext/Apps/44/Assets/AssetUpdateMultiple?AssetIDs=${assetIDs}`;
        window.open(
            url,
            "_blank",
            "width=800,height=600"
        );
    }

    return (
        <NewWindow
            title={"Bulk Inventory"}
            onUnload={props.onClose}
            features={{width: 900, height: 600}}
        >
            <div style={{padding: 15}}>
                <table className={"table table-striped table-bordered"} style={{marginBottom: 0}}>
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

                <button
                    className={"btn btn-primary"}
                    onClick={updateAllAssets}
                    style={{marginTop: 5, marginLeft: 0}}
                    disabled={assets.length === 0}
                >
                    Update All Assets
                </button>

                {error && (
                    <div className={"alert alert-danger"} style={{marginTop: 5}}>

                        <button
                            className={"close"}
                            onClick={() => setError(null)}
                        >
                            <span>&times;</span>
                        </button>

                        {error.split("\n").map((line, i) => (
                            <div key={i}>
                                {line}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </NewWindow>
    )
}
