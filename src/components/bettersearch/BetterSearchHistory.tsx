import BetterSearchResult from "./BetterSearchResult";
import useSettings from "../../hooks/useSettings";
import useSearchHistory from "../../hooks/useSearchHistory";

export interface BetterSearchHistoryProps {
    onHide: () => void;
}

export default function BetterSearchHistory(props: BetterSearchHistoryProps) {
    const [searchHistory] = useSearchHistory();
    const [settings] = useSettings();

    // Fallback if no bettersearch history is available
    if (!settings.enableNewSearchHistory || searchHistory.length === 0)
        return (
            <span
                style={{fontSize: 14}}
                className={"text-center w-100 text-muted fst-italic d-block"}
            >
                Start typing to search...
            </span>
        );

    return (
        <>
            <h6
                className={"dropdown-header"}
                style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 12
                }}
            >
                Recent Searches
            </h6>
            {searchHistory
                .toReversed()
                .map((result, index) => (
                    <BetterSearchResult
                        key={index}
                        result={result}
                        disableHistory
                        onHide={props.onHide}
                    />
                ))}
        </>
    )
}