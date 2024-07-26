import addComponentToDOM from "../../utils/addComponentToDOM";
import TicketFeed from "../pages/TicketFeed";

export default function ConvertFeedButton() {
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
    }

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