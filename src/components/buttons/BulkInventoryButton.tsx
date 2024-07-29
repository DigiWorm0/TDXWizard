import React from "react";
import BulkInventoryModal from "../modals/BulkInventoryModal";

export default function BulkInventoryButton() {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
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