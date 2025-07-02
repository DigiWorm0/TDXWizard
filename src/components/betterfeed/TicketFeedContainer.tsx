import BetterFeed from "./BetterFeed";
import useTicketFeed from "../../hooks/useTicketFeed";

export default function TicketFeedContainer() {
    const ticketFeed = useTicketFeed();

    return (
        <BetterFeed feed={ticketFeed}/>
    )
}