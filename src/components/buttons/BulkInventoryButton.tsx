import React from "react";
import BulkInventoryModal from "../modals/bulkInventory/BulkInventoryModal";
import useSettings from "../../hooks/useSettings";
import TDXButton from "./common/TDXButton";

export interface BulkInventoryButtonProps {
    appID: number;
}

export default function BulkInventoryButton(props: BulkInventoryButtonProps) {
    const [settings] = useSettings();
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    if (!settings.bulkInventoryButton)
        return null;
    return (
        <>
            <TDXButton
                type={"tdx"}
                text={"Bulk Inventory"}
                icon={"fa fa-solid fa-boxes"}
                title={"Tool for editing large amounts of assets at once"}
                onClick={() => setIsModalVisible(true)}
                disabled={isModalVisible}
            />

            {isModalVisible && (
                <BulkInventoryModal
                    onClose={() => setIsModalVisible(false)}
                    appID={props.appID}
                />
            )}
        </>
    );
}