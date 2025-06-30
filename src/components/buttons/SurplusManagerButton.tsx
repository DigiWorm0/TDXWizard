import React from "react";
import useSettings from "../../hooks/useSettings";
import SurplusManagerModal from "../modals/surplus/SurplusManagerModal";
import TDXButton from "./common/TDXButton";

export default function SurplusManagerButton() {
    const [settings] = useSettings();
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    if (!settings.showSurplusButtons)
        return null;
    return (
        <>
            <TDXButton
                type={"tdx"}
                icon={"fa fa-solid fa-recycle"}
                onClick={() => setIsModalVisible(true)}
                disabled={isModalVisible}
                title={"Tool for managing surplus assets and processes"}
                text={"Surplus Manager"}
            />

            {isModalVisible && (
                <SurplusManagerModal
                    onClose={() => setIsModalVisible(false)}
                />
            )}
        </>
    );
}