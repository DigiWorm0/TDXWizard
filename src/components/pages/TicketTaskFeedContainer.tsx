import BetterFeed from "../feed/BetterFeed";
import useTicketTaskFeed from "../../hooks/useTicketTaskFeed";

export default function TicketTaskFeedContainer() {
    const ticketTaskFeed = useTicketTaskFeed();

    return (
        <BetterFeed feed={ticketTaskFeed}/>
    )
}