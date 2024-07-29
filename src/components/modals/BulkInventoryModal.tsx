import NewWindow from "react-new-window";
import React from "react";
import Asset from "../../tdx-api/types/Asset";
import UWStoutTDXClient from "../../utils/tdx/UWStoutTDXClient";
import AppID from "../../types/AppID";
import AssetLink from "../buttons/AssetLink";
import autoRetryHTTPRequest from "../../utils/autoRetryHTTPRequest";

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
        setError(null);
        setIsLoading(true);

        // Get the search query
        const inputValue = e.currentTarget.value.trim();
        e.currentTarget.value = "";
        console.log(inputValue);

        const searchQueries = inputValue.split("\n");
        console.log(searchQueries);

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
            () => client.assets.searchAssets(AppID.Inventory, {SerialLike: searchQuery}),
            30000,
            3,
            (retries) => handleError(new Error(`Rate limit exceeded. Retrying in 30s... (${retries}/3)`))
        );

        // Check Results
        if (searchResults.length === 0)
            throw new Error(`Can't find ${searchQuery}`);
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
            "Bulk Inventory Update",
            "width=800,height=600"
        );
    }

    return (
        <NewWindow
            title={"Bulk Inventory"}
            onUnload={props.onClose}
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
                            Owner
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {assets.map(asset => (
                        <tr key={asset.ID}>
                            <td><AssetLink id={asset.ID}>{asset.Tag}</AssetLink></td>
                            <td><AssetLink id={asset.ID}>{asset.SerialNumber}</AssetLink></td>
                            <td>
                                {asset.OwningCustomerName !== "None" ?
                                    asset.OwningCustomerName :
                                    asset.OwningDepartmentName}
                            </td>
                            <td className={"text-center"}>
                                <button
                                    className={"btn btn-danger btn-sm"}
                                    onClick={() => removeAsset(asset)}
                                >
                                    {/* FontAwesome breaks inside Shadow DOM */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="bi bi-trash-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
                                        />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                    {assets.length === 0 && !isLoading && (
                        <tr>
                            <td colSpan={4} className={"text-center"}>
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
                            <td colSpan={4} className={"text-center"}>
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
                    className={"form-control"}
                    placeholder={"Scan or type an asset tag or serial number"}
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
                >
                    Update All Assets
                </button>


                {error && (
                    <div className={"alert alert-danger"} style={{marginTop: 5}}>
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
