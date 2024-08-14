import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import getAppIDFromURL from "../../utils/tdx/getAppIDFromURL";
import React from "react";
import useSettings from "../../hooks/useSettings";

export default function TicketPrintButton() {
    const [settings] = useSettings();
    const printArea = React.useRef<HTMLIFrameElement>(null);

    React.useEffect(() => {
        // Get the Print View Button
        const printViewButton = document.querySelector("button[title='Print View']") as HTMLButtonElement;
        if (!printViewButton)
            throw new Error("Print View Button not found");

        // Hide the Print View Button
        printViewButton.style.display = settings.hideTicketPrintViewButton ? "none" : "block";
    }, [settings.hideTicketPrintViewButton]);

    const printURL = React.useMemo(() => {
        const ticketID = getTicketIDFromURL();
        const appID = getAppIDFromURL();

        return `${window.location.origin}/TDNext/Apps/${appID}/Tickets/TicketDetPrint?TicketID=${ticketID}`;
    }, []);

    const onPrint = () => {
        const iframe = printArea.current;
        if (iframe)
            iframe.contentWindow?.print();
    }

    if (!settings.showTicketPrintButton)
        return null;
    return (
        <>
            <button
                type={"button"}
                className={"btn btn-primary btn-sm"}
                onClick={() => onPrint()}
                style={{marginLeft: "5px"}}
            >
                <span className={"fa fa-solid fa-nopad fa-print"}/>
                <span className={"hidden-xs padding-left-xs"}>
                    Print
                </span>
            </button>
            <iframe
                ref={printArea}
                src={printURL}
                style={{display: "none"}}
            />
        </>
    )
}