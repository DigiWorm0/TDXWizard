import getTicketIDFromURL from "../../../tdx-api/utils/getTicketIDFromURL";
import getAppIDFromURL from "../../../tdx-api/utils/getAppIDFromURL";
import React from "react";
import useSettings from "../../../hooks/useSettings";
import openWindow from "../../../utils/openWindow";
import TDXButtonGroup from "../../common/TDXButtonGroup";
import TDXButton from "../../common/TDXButton";
import useRunPromise from "../../../hooks/useRunPromise";

export default function TicketPrintButton() {
    const [settings] = useSettings();
    const printArea = React.useRef<HTMLIFrameElement>(null);
    const [runPromise, isLoading] = useRunPromise();

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

    const onPrint = async () => {

        // Get the print area iframe
        const iframe = printArea.current;
        if (!iframe)
            throw new Error("Print area iframe not found");

        // Check if the iframe is loaded
        if (!isLoading && iframe.contentWindow?.document.readyState !== "complete") {
            // Wait for the iframe to load
            await new Promise<void>((resolve) => {
                iframe.onload = () => resolve();
            });
        }

        // Print the iframe content
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
                    onClick={() => runPromise(onPrint())}
                    noMargin
                    disabled={isLoading}
                    icon={isLoading ?
                        "fa fa-solid fa-nopad fa-spinner fa-spin" :
                        "fa fa-solid fa-nopad fa-print"}
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