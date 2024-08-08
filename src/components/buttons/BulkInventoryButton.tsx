import React from "react";
import BulkInventoryModal from "../modals/BulkInventoryModal";
import useSettings from "../../hooks/useSettings";

export default function BulkInventoryButton() {
    const [settings] = useSettings();
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    if (!settings.bulkInventoryButton)
        return null;
    return (
        <>
            <a
                className={`btn btn-link ${isModalVisible ? "disabled" : ""}`}
                href={"#"}
                onClick={e => {
                    e.preventDefault();
                    setIsModalVisible(true);
                }}
            >
                <span className={"fa-solid fa-boxes"}/>
                <span className={"hidden-xs"}>
                    Bulk Inventory
                </span>
            </a>
            {isModalVisible && (
                <BulkInventoryModal
                    onClose={() => setIsModalVisible(false)}
                />
            )}
        </>
    );
}