import addComponentToDOM from "../../utils/addComponentToDOM";
import TicketFeed from "../pages/TicketFeed";
import useSettings from "../../hooks/useSettings";
import React from "react";

export default function ConvertFeedButton() {
    const [settings] = useSettings();
    const [isConverted, setIsConverted] = React.useState(false);

    const convertFeed = () => {
        // Feed
        const ticketFeed = document.getElementById("ticketFeed");
        if (!ticketFeed)
            throw new Error("Ticket Feed not found");

        // Remove all children
        while (ticketFeed.firstChild)
            ticketFeed.removeChild(ticketFeed.firstChild);

        // Add Ticket Feed
        addComponentToDOM(ticketFeed, <TicketFeed/>);
        setIsConverted(true);
    }

    React.useEffect(() => {
        // Imagine being a pure function, couldn't be me
        if (settings.useNewFeed)
            convertFeed();
    }, [settings.useNewFeed]);

    if (isConverted)
        return null;
    return (
        <button
            type={"button"}
            className={"btn btn-default btn-sm"}
            onClick={convertFeed}
        >
            <span className={"fa fa-solid fa-fw fa-magic"}/>
            <span className={"hidden-xs"}>
                Wizard Feed
            </span>
        </button>
    )
}