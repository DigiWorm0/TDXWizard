import React from "react";
import useSettings from "../../hooks/useSettings";

const LEGACY_AD_URL = "https://selfservicehd.uwstout.edu/helpdesk/default.aspx?ctl=acctstatus.ascx";

export default function LegacySearchButton() {
    const [settings] = useSettings();

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(LEGACY_AD_URL, "_blank", "width=992,height=800");
    }

    if (!settings.legacyLookupButton)
        return;
    return (
        <a
            href={LEGACY_AD_URL}
            target={"_blank"}
            onClick={onClick}
        >
            Search in Legacy
        </a>
    )
}