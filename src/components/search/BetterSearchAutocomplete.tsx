import SearchResult from "../../types/SearchResult";
import BetterSearchResult from "./BetterSearchResult";
import useSettings from "../../hooks/useSettings";
import BetterSearchDropdownItem from "./BetterSearchDropdownItem";
import CustomAttributeComponent from "../../tdx-api/types/CustomAttributeComponent";
import {SearchType} from "../../types/SearchType";

export interface BetterSearchAutocompleteProps {
    results: SearchResult[];
    isLoading?: boolean;
    resultsIndex: number;
    setResultsIndex: (index: number) => void;
}

const COMPONENT_ID_TO_TYPE: Partial<Record<CustomAttributeComponent, SearchType>> = {
    [CustomAttributeComponent.Person]: SearchType.Person,
    [CustomAttributeComponent.Asset]: SearchType.Laptop,
    [CustomAttributeComponent.Ticket]: SearchType.Ticket,
}

export default function BetterSearchAutocomplete(props: BetterSearchAutocompleteProps) {
    const [settings] = useSettings();
    const {results, isLoading} = props;

    if (!settings.enableNewSearchAutocomplete)
        return null;
    return (
        <>
            {/*<div className={"dropdown-divider"}/>*/}

            {results.map((result, index) => (
                <BetterSearchResult
                    key={index}
                    href={result.DetailUrl}
                    selected={props.resultsIndex === index + 1}
                    type={COMPONENT_ID_TO_TYPE[result.ComponentID] ?? SearchType.Other}
                    text={result.Title}
                />
            ))}

            {/*{results.length === 0 && !isLoading && (*/}
            {/*    <BetterSearchDropdownItem*/}
            {/*        disabled*/}
            {/*        icon={"fa fa-exclamation-triangle"}*/}
            {/*        text={"No results found"}*/}
            {/*    />*/}
            {/*)}*/}

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