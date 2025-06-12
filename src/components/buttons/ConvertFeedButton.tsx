import addComponentToDOM from "../../utils/addComponentToDOM";
import useSettings from "../../hooks/useSettings";
import React from "react";
import TicketFeedContainer from "../pages/TicketFeedContainer";
import AssetFeedContainer from "../pages/AssetFeedContainer";

export interface ConvertFeedButtonProps {
    type: "asset" | "ticket";
}

export default function ConvertFeedButton(props: ConvertFeedButtonProps) {
    const [settings] = useSettings();
    const [newFeedComponent, setNewFeedComponent] = React.useState<HTMLElement | null>(null);

    const isConverted = newFeedComponent !== null;

    const getFeed = () => {
        const ticketFeed = document.getElementById("ticketFeed");
        const assetFeed = document.getElementById("assetFeed");
        const feed = ticketFeed || assetFeed;
        if (!feed)
            throw new Error("Feed not found");
        return feed;
    }

    const convertToNewFeed = () => {
        // Feed
        const ticketFeed = getFeed();

        // Hide Old Feed
        ticketFeed.style.display = "none";

        // Add Ticket Feed
        const component = addComponentToDOM(
            ticketFeed.parentElement ?? ticketFeed,
            props.type === "asset" ? <AssetFeedContainer/> : <TicketFeedContainer/>
        );
        component.style.width = "100%";
        setNewFeedComponent(component);
    }

    const revertToOldFeed = () => {
        // Feed
        const ticketFeed = getFeed();

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
                className={"btn btn-primary btn-sm"}
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
                className={"btn btn-primary btn-sm"}
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