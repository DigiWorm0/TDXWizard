import BetterSearchResult from "./BetterSearchResult";
import useSettings from "../../hooks/useSettings";
import useSearchHistory from "../../hooks/useSearchHistory";

export default function BetterSearchHistory() {
    const [searchHistory] = useSearchHistory();
    const [settings] = useSettings();

    // Fallback if no search history is available
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
                .map((item, index) => (
                    <BetterSearchResult
                        key={index}
                        text={item.text}
                        href={item.href}
                        type={item.type}
                        disableHistory
                    />
                ))}
        </>
    )
}