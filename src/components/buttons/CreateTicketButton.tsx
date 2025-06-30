import useSettings from "../../hooks/useSettings";
import AppID from "../../types/AppID";
import openWindow from "../../utils/openWindow";

export default function CreateTicketButton() {
    const [settings] = useSettings();

    const onClick = () => {
        openWindow(`/TDNext/Apps/${AppID.Tickets}/Tickets/New`, "New Service Request");
    }

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