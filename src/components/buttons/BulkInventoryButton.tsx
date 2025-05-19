import React from "react";
import BulkInventoryModal from "../modals/BulkInventoryModal";
import useSettings from "../../hooks/useSettings";

export interface BulkInventoryButtonProps {
    appID?: number;
}

export default function BulkInventoryButton(props: BulkInventoryButtonProps) {
    const [settings] = useSettings();
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    if (!settings.bulkInventoryButton)
        return null;
    return (
        <>
            <div
                className={"tdx-btn tdx-btn--secondary"}
                title={"Tool for editing large amounts of assets at once"}
                onClick={e => {
                    e.preventDefault();
                    setIsModalVisible(true);
                }}
            >
                <span className={"fa-solid fa-boxes me-1"}/>
                <span className={"hidden-xs"}>
                    Bulk Inventory
                </span>
            </div>
            {isModalVisible && (
                <BulkInventoryModal
                    onClose={() => setIsModalVisible(false)}
                    appID={props.appID}
                />
            )}
        </>
    );
}