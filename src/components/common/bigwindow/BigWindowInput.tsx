import React from "react";

export interface BigWindowInputProps {
    disabled?: boolean;
    onSearch: (searchQueries: string[]) => void;
}

export default function BigWindowInput(props: BigWindowInputProps) {

    const handleInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (props.disabled)
            return;

        // Only submit on Enter key press
        if (e.key !== "Enter")
            return;
        if (e.ctrlKey || e.shiftKey || e.altKey)
            return;
        e.preventDefault();

        // Get the bettersearch query
        const inputValue = e.currentTarget.value.trim();
        let searchQueries = inputValue.split("\n");

        // Remove Whitespace
        searchQueries = searchQueries
            .map(query => query.trim())
            .filter(query => query.length > 0);

        // Clear Input
        e.currentTarget.value = "";

        // Search
        props.onSearch(searchQueries);
    }

    return (
        <textarea
            autoFocus
            className={"form-control"}
            placeholder={"Scan/type an asset tag OR paste a column/list of asset tags"}
            onKeyDown={handleInput}
            style={{
                marginTop: 5,
                height: 50,
                minWidth: "100%",
                maxWidth: "100%",
            }}
        />
    )
}