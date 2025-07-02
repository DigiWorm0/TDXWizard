import addComponentToDOM from "../../utils/addComponentToDOM";
import useSettings from "../../hooks/useSettings";
import React from "react";
import TicketFeedContainer from "./TicketFeedContainer";
import AssetFeedContainer from "./AssetFeedContainer";
import TDXButton from "../common/TDXButton";
import TicketTaskFeedContainer from "./TicketTaskFeedContainer";

export interface ConvertFeedButtonProps {
    type: "asset" | "ticket" | "ticketTask";
}

const TYPE_TO_ID = {
    asset: "assetFeed",
    ticket: "ticketFeed",
    ticketTask: "ticketTaskFeed"
}

const TYPE_TO_COMPONENT = {
    asset: AssetFeedContainer,
    ticket: TicketFeedContainer,
    ticketTask: TicketTaskFeedContainer
}

export default function ConvertFeedButton(props: ConvertFeedButtonProps) {
    const [settings] = useSettings();
    const [newFeedComponent, setNewFeedComponent] = React.useState<HTMLElement | null>(null);

    const isConverted = newFeedComponent !== null;

    const getFeed = () => {
        const feed = document.getElementById(TYPE_TO_ID[props.type]);
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
            React.createElement(TYPE_TO_COMPONENT[props.type], {
                feedId: TYPE_TO_ID[props.type],
                type: props.type
            }),
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
        // Abort if disabled on specific feed types
        if (!settings.useNewFeedOnTickets && props.type === "ticket")
            return;
        if (!settings.useNewFeedOnAssets && props.type === "asset")
            return;
        if (!settings.useNewFeedOnTicketTasks && props.type === "ticketTask")
            return;

        // Imagine being a pure function, couldn't be me
        if (settings.useNewFeed)
            convertToNewFeed();
    }, [settings.useNewFeed]);

    return (
        <TDXButton
            intent={"primary"}
            icon={isConverted ? "fa fa-solid fa-nopad fa-backward me-1" : "fa fa-solid fa-nopad fa-magic me-1"}
            text={isConverted ? "Old Feed" : "New Feed"}
            onClick={isConverted ? revertToOldFeed : convertToNewFeed}
            title={isConverted ? "Revert to Old Feed" : "Convert to New Feed"}
            noMargin
        />
    )
}