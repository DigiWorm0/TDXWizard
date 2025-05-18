import getTicketIDFromURL from "../../utils/tdx/getTicketIDFromURL";
import getAppIDFromURL from "../../utils/tdx/getAppIDFromURL";
import React from "react";
import useSettings from "../../hooks/useSettings";

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

    const onPrintView = () => {
        const windowWidth = 800;
        const windowHeight = 600;
        const windowTop = window.screenY + (window.outerHeight - windowHeight) / 2;
        const windowLeft = window.screenX + (window.outerWidth - windowWidth) / 2;

        window.open(
            printURL,
            "_blank",
            `width=${windowWidth},height=${windowHeight},top=${windowTop},left=${windowLeft}`
        );
    }

    if (!settings.showTicketPrintButton)
        return null;
    return (
        <>
            <div className={"btn-group"} style={{marginLeft: "5px", gap: 0}}>

                {/* Print Button */}
                <button
                    type={"button"}
                    className={"btn btn-primary btn-sm"}
                    onClick={() => onPrint()}
                    style={{marginRight: 0}}
                    disabled={!isLoaded}
                >
                    {/* Print Button Icon */}
                    {isLoaded ?
                        <span className={"fa fa-solid fa-nopad fa-print"}/>
                        :
                        <span className={"fa fa-solid fa-nopad fa-spinner fa-spin"}/>
                    }

                    {/* Print Button Text */}
                    <span className={"hidden-xs padding-left-xs"}>
                        Print
                    </span>
                </button>

                {/* Print View Button */}
                <button
                    type={"button"}
                    className={"btn btn-primary btn-sm"}
                    onClick={() => onPrintView()}
                    style={{paddingLeft: 10, paddingRight: 10}}
                >
                    <span className={"fa fa-solid fa-nopad fa-up-right-from-square"}/>
                </button>
            </div>

            {/* Hidden Print View */}
            <iframe
                ref={printArea}
                src={printURL}
                style={{display: "none"}}
            />
        </>
    )
}