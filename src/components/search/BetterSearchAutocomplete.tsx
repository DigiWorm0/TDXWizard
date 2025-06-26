import BetterSearchResult from "./BetterSearchResult";
import useSettings from "../../hooks/useSettings";
import BetterSearchDropdownItem from "./BetterSearchDropdownItem";
import SearchResult from "../../types/SearchResult";

export interface BetterSearchAutocompleteProps {
    results: SearchResult[];
    isLoading?: boolean;
    resultsIndex: number;
    setResultsIndex: (index: number) => void;
    onHide: () => void;
}

export default function BetterSearchAutocomplete(props: BetterSearchAutocompleteProps) {
    const [settings] = useSettings();
    const {results, isLoading} = props;

    if (!settings.enableNewSearchAutocomplete)
        return null;
    return (
        <>
            {results.map((result, index) => (
                <BetterSearchResult
                    key={index}
                    result={result}
                    selected={props.resultsIndex === index}
                    onHide={props.onHide}
                />
            ))}

            {isLoading && (
                <BetterSearchDropdownItem
                    disabled
                    icon={"fa fa-spinner fa-spin"}
                    text={"Loading results..."}
                />
            )}
        </>
    )
}