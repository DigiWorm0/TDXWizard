import useCustomStyle from "../../hooks/useCustomStyle";
import useSettings from "../../hooks/useSettings";
import React from "react";
import Color from "color";

const VARIABLE_COLORS: Record<string, string> = {
    "--wizard_color": "#504687",
    "--wizard_color-bg": "#ebe9f5",
    "--wizard_color-bg-secondary": "#d9d5eb",
    "--wizard_color-secondary": "#4b3bb9",
    "--wizard_color-bg-secondary-hover": "#a7a9c9",
    "--wizard_color-border-secondary-hover": "#a7a9c9",
    "--wizard_tab-color": "#413473",
    "--wizard_modal-bg": "rgba(82,76,139,.67)",
    "--wizard_tab-highlight": "#f4f3fb",

    "--wizard_link-hover": "#34295b",
    "--visited-link-color": "#6B5CDC",
    "--link-purple": "#6B5CDC",

    // Charts
    "--primaryD1": "#34295b",
    "--primaryD2": "#413972",
    "--primaryD3": "#504687",
    "--primaryD4": "#524c8b",
    "--primaryD5": "#585494",
    "--primaryL1": "#6e6da3",
    "--primaryL2": "#817ba3",
    "--primaryL3": "#a7a9c9",
    "--primaryL4": "#d9d5eb",
    "--primaryL5": "#ebe9f5",
    "--primaryL6": "#f2f1f9",
    "--secondaryD1": "#130f2e",
    "--secondaryD2": "#1e1e45",
    "--secondaryD3": "#262651",
    "--secondaryD4": "#2d2e5b",
    "--secondaryD5": "#333562",
    "--secondaryL1": "#4d5076",
    "--secondaryL2": "#696c8c",
    "--secondaryL3": "#53586e",
    "--secondaryL4": "#bcbece",
    "--secondaryL5": "#e4e5eb",
    "--secondaryL6": "#f2f2f5",
    "--emphasis1": "#3a3847",
    "--emphasis2": "#514d66",
    "--emphasis3": "#817e94",
    "--emphasis4": "#e0deeb",
    "--emphasis5": "#f4f3fb",
    "--emphasis6": "#FAFAFF",
}

function adjustColor(defaultColor: string, newColor: string) {
    // Convert Hex to HSL
    const defaultColorObj = Color(defaultColor);
    const newColorObj = Color(newColor);

    const combinedColor = Color({
        h: newColorObj.hue(),
        s: defaultColorObj.saturationl(),
        l: defaultColorObj.lightness(),
        //l: (defaultColorObj.lightness() / 100) * (newColorObj.lightness() / 100) * 100,
        alpha: defaultColorObj.alpha()
    });

    return combinedColor.toString();
}

export default function CustomStyles() {
    const [settings] = useSettings();

    useCustomStyle("denseStyle", "wizard_dense");
    useCustomStyle("stripedTableRows", "wizard_striped-table-rows");
    useCustomStyle("useCustomColorPalette", "wizard_custom-palette");
    useCustomStyle("hideTicketBannerMessage", "wizard_hide-ticket-banner-msg");

    React.useEffect(() => {
        if (!settings.useCustomColorPalette)
            return;

        // Add each custom style variable to the document root
        const variables = Object.keys(VARIABLE_COLORS);
        variables.forEach(variable => {

            // Adjust color from default
            const defaultColor = VARIABLE_COLORS[variable];
            const adjustedColor = adjustColor(defaultColor, settings.primaryColor);

            // Apply the adjusted color to the custom style variable
            document.documentElement.style.setProperty(variable, adjustedColor);
        });

        return () => {
            // Reset the custom styles when the component unmounts
            variables.forEach(variable => {
                document.documentElement.style.removeProperty(variable);
            });
        }
    }, [settings]);

    return (
        <div/>
    )
}