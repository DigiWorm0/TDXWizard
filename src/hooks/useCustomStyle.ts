import "../styles/common.css"
import useSettings from "./useSettings";
import React from "react";
import Settings from "../types/Settings";


export default function useCustomStyle(settingType: keyof Settings, className: string) {
    const [settings] = useSettings();

    React.useEffect(() => {

        // Add the class to the body when the setting is enabled
        if (settings[settingType])
            document.body.classList.add(className);

        // Remove the class from the body when the setting is disabled
        else
            document.body.classList.remove(className);
    }, [settings])
}