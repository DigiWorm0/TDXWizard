import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import getAppIDFromURL from "../../utils/tdx/getAppIDFromURL";
import React from "react";
import useSettings from "../../hooks/useSettings";
import openWindow from "../../utils/openWindow";
import TDXButtonGroup from "./common/TDXButtonGroup";
import TDXButton from "./common/TDXButton";

export default function TicketPrintButton() {
    const [settings] = useSettings();
    const printArea = React.useRef<HTMLIFrameElement>(null);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        const onLoad = () => setIsLoaded(true);

        printArea.current?.addEventListener("load", onLoad);
        return () => {
            printArea.current?.removeEventListener("load", onLoad);
        }
    }, [printArea])

    React.useEffect(() => {
        // Get the Print View Button
        const printViewButton = document.querySelector("button[title='Print View']") as HTMLButtonElement;
        if (!printViewButton)
            throw new Error("Print View Button not found");

        // Hide the Print View Button
        const parentElement = printViewButton.parentElement;
        if (parentElement)
            parentElement.style.display = settings.hideTicketPrintViewButton ? "none" : "block";
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
            <TDXButtonGroup>

                {/* Print Button */}
                <TDXButton
                    intent={"secondary"}
                    onClick={() => onPrint()}
                    noMargin
                    disabled={!isLoaded}
                    icon={isLoaded ? "fa fa-solid fa-nopad fa-print" : "fa fa-solid fa-nopad fa-spinner fa-spin"}
                    text={"Print"}
                >
                </TDXButton>

                {/* Print View Button */}
                <TDXButton
                    intent={"secondary"}
                    onClick={() => openWindow(printURL, "Print View")}
                    noMargin
                    icon={"fa fa-solid fa-nopad fa-up-right-from-square"}
                    title={"Print View"}
                />
            </TDXButtonGroup>

            {/* Hidden Print View */}
            <iframe
                ref={printArea}
                src={printURL}
                style={{display: "none"}}
            />
        </>
    )
}