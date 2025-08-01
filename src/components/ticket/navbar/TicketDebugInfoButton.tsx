import useTicket from "../../../hooks/useTicket";
import useSettings from "../../../hooks/useSettings";
import TDXButton from "../../common/TDXButton";

export default function TicketDebugInfoButton() {
    const [settings] = useSettings();
    const ticket = useTicket();

    if (!settings.developerMode)
        return null;
    return (
        <TDXButton
            onClick={() => {
                // eslint-disable-next-line no-console
                console.log("Ticket Debug Info:", ticket);
            }}
            text={"Debug Info"}
            icon={"fa fa-code"}
        />
    );

}