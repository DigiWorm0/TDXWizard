import useTicket from "../../hooks/useTicket";
import useUser from "../../hooks/useUser";
import React from "react";
import {GM_setValue} from "$";

const LEGACY_AD_URL = "https://selfservicehd.uwstout.edu/helpdesk/default.aspx?ctl=acctstatus.ascx";

export default function LegacySearchButton() {
    const ticket = useTicket();
    const requestor = useUser(ticket?.RequestorUid ?? "");

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();

        const username = requestor?.UserName?.split("@")[0];
        GM_setValue("__tdxwizard-search", username);
        window.open(LEGACY_AD_URL, "_blank", "width=992,height=800");
    }

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