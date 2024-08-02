import addComponentToDOM from "../../utils/addComponentToDOM";
import useSettings from "../../hooks/useSettings";
import React from "react";
import TicketFeedContainer from "../pages/TicketFeedContainer";

export default function ConvertFeedButton() {
    const [settings] = useSettings();
    const [newFeedComponent, setNewFeedComponent] = React.useState<HTMLElement | null>(null);

    const isConverted = newFeedComponent !== null;

    const convertToNewFeed = () => {
        // Feed
        const ticketFeed = document.getElementById("ticketFeed");
        if (!ticketFeed)
            throw new Error("Ticket Feed not found");

        // Hide Old Feed
        ticketFeed.style.display = "none";

        // Add Ticket Feed
        const component = addComponentToDOM(ticketFeed.parentElement ?? ticketFeed, <TicketFeedContainer/>);
        component.style.width = "100%";
        setNewFeedComponent(component);
    }

    const revertToOldFeed = () => {

        // Feed
        const ticketFeed = document.getElementById("ticketFeed");
        if (!ticketFeed)
            throw new Error("Ticket Feed not found");

        // Remove New Feed
        if (newFeedComponent)
            newFeedComponent.remove();
        setNewFeedComponent(null);

        // Show Old Feed
        ticketFeed.style.display = "";
    }

    React.useEffect(() => {
        // Imagine being a pure function, couldn't be me
        if (settings.useNewFeed)
            convertToNewFeed();
    }, [settings.useNewFeed]);

    if (isConverted) {
        return (
            <button
                type={"button"}
                className={"btn btn-default btn-sm"}
                onClick={revertToOldFeed}
            >
                <span className={"fa fa-solid fa-fw fa-backward"}/>
                <span className={"hidden-xs"}>
                   Old Feed
                </span>
            </button>
        );
    } else {
        return (
            <button
                type={"button"}
                className={"btn btn-success btn-sm"}
                onClick={convertToNewFeed}
            >
                <span className={"fa fa-solid fa-fw fa-magic"}/>
                <span className={"hidden-xs"}>
                    New Feed
                </span>
            </button>
        );
    }
}