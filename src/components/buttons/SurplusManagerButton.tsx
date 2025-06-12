import React from "react";
import useSettings from "../../hooks/useSettings";
import SurplusManagerModal from "../modals/surplus/SurplusManagerModal";

export default function SurplusManagerButton() {
    const [settings] = useSettings();
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    if (!settings.bulkInventoryButton)
        return null;
    return (
        <>
            <div
                className={"tdx-btn tdx-btn--secondary me-1"}
                title={"Tool for managing surplus assets and processes"}
                onClick={e => {
                    e.preventDefault();
                    setIsModalVisible(true);
                }}
            >
                <span className={"fa-solid fa-recycle me-1"}/>
                <span className={"hidden-xs"}>
                    Surplus Manager
                </span>
            </div>
            {isModalVisible && (
                <SurplusManagerModal
                    onClose={() => setIsModalVisible(false)}
                />
            )}
        </>
    );
}