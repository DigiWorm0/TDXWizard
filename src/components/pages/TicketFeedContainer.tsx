import ErrorBoundary from "../utils/ErrorBoundary";
import TicketFeed from "../feed/TicketFeed";

export default function TicketFeedContainer() {
    return (
        <ErrorBoundary
            fallback={(e) => (
                <div className={"alert alert-danger"} style={{marginTop: 5}}>
                    {e.toString()}
                </div>
            )}
        >
            <TicketFeed/>
        </ErrorBoundary>
    )
}