import useTicketAssets from "../../../hooks/useTicketAssets";
import TicketAssetPanelRow from "./TicketAssetPanelRow";
import useSettings from "../../../hooks/useSettings";

export default function TicketAssetPanel() {
    const assets = useTicketAssets();
    const [settings] = useSettings();

    const isTableVisible = assets && assets.length > 0;

    if (!settings.ticketAssetsPanel)
        return null;
    return (
        <div className={"panel panel-default"}>
            {/* Panel header */}
            <div
                className={"panel-heading"}
                style={{border: isTableVisible ? "none" : undefined}}   // <-- Fix issue with double border
            >
                <h2 className={"h3 gutter-none clearfix black"}>
                    Assets/CIs {assets && `(${assets.length})`}
                </h2>
            </div>

            {/* Panel body */}
            <div
                className={"panel-body"}
                style={{paddingTop: isTableVisible ? 0 : undefined}} // <-- Fix issue with unnecessary padding
            >

                {/* Loading state */}
                {assets === undefined && (
                    <p
                        className={"text-muted"}
                        style={{margin: 0}}
                    >
                        <span
                            style={{marginRight: 8}}
                            className={"fa fa-spinner fa-spin"}
                        />
                        Loading assets...
                    </p>
                )}

                {/* No assets found */}
                {assets?.length === 0 && (
                    <p
                        className={"text-muted"}
                        style={{margin: 0}}
                    >
                        No assets associated with this ticket.
                    </p>
                )}

                {/* Assets table */}
                <table className={"table table-striped table-hover tdworkmgmt"}>
                    <tbody>
                    {assets?.map(asset => <TicketAssetPanelRow key={asset.ID} id={asset.ID} name={asset.Name}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}