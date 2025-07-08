import useSettings from "../../../hooks/useSettings";
import useTicket from "../../../hooks/useTicket";
import TDXButton from "../../common/TDXButton";
import openWindow from "../../../utils/openWindow";

export default function TicketUpdateButton() {
    const [settings] = useSettings();
    const ticket = useTicket();

    const updateTicket = () => {
        openWindow(`/TDNext/Apps/${ticket?.AppID}/Tickets/Update?TicketID=${ticket?.ID}`);
    }

    // Disabled
    if (!settings.updateButton)
        return null;
    return (
        <TDXButton
            text={"Update"}
            title={"Add a ticket update to the ticket betterfeed"}
            icon={"fa fa-solid fa-nopad fa-square-caret-up"}
            disabled={!ticket}
            onClick={() => updateTicket()}
        />
    )
}