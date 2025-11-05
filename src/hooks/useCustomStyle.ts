import "../styles/common.css"
import "../styles/customPalette.css";
import useSettings from "./useSettings";
import React from "react";
import Settings from "../types/Settings";


export default function useCustomStyle(settingType: keyof Settings, className: string, url?: RegExp) {
    const [settings] = useSettings();

    React.useEffect(() => {

        if (url) {
            if (!url.test(window.location.href)) {
                // Remove the class from the body when the setting is disabled
                document.body.classList.remove(className);
                return;
            }
        }

        // Add the class to the body when the setting is enabled
        if (settings[settingType])
            document.body.classList.add(className);

        // Remove the class from the body when the setting is disabled
        else
            document.body.classList.remove(className);
    }, [settings])
}