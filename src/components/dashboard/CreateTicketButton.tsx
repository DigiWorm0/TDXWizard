import useSettings from "../../hooks/useSettings";
import openWindow from "../../utils/openWindow";
import checkIsUWStout from "../../utils/checkIsUWStout";

const TICKETS_APP_ID = 43; // UW-Stout TDX Tickets App ID

export default function CreateTicketButton() {
    const [settings] = useSettings();

    const onClick = () => {
        openWindow(`/TDNext/Apps/${TICKETS_APP_ID}/Tickets/New`, "New Service Request");
    }

    if (!checkIsUWStout())
        return null;
    if (!settings.dashboardAddTicketButton)
        return null;
    return (
        <div
            className={"tdx-action-menu__item"}
            onClick={onClick}
        >
            <span className={"fa fa-solid fa-nopad fa-plus me-1"}/>
            <span className={"hidden-xs padding-left-xs"}>
                Service Request
            </span>
        </div>
    )
}