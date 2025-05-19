import useSettings from "../../hooks/useSettings";
import AppID from "../../types/AppID";

export default function CreateTicketButton() {
    const [settings] = useSettings();

    const onClick = () => {
        const href = `/TDNext/Apps/${AppID.Tickets}/Tickets/New`;
        window.openWinReturn(href);
    }

    if (!settings.dashboardAddTicketButton)
        return null;
    return (
        <div
            className={"tdx-action-menu__item "}
            onClick={onClick}
        >
            <span className={"fa fa-solid fa-nopad fa-plus me-1"}/>
            <span className={"hidden-xs padding-left-xs"}>
                Service Request
            </span>
        </div>
    )
}