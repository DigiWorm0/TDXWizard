import TDXButton from "../common/TDXButton";
import useSearchHistory from "../../hooks/useSearchHistory";
import React from "react";
import toast from "react-hot-toast";

export default function ClearSearchHistoryButton() {
    const [_, setSearchHistory] = useSearchHistory();

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to clear all search history?"))
            return;

        setSearchHistory([]);
        toast.success("Search history cleared successfully!");
    }

    return (
        <TDXButton
            intent={"secondary"}
            icon={"fa fa-solid fa-undo me-1"}
            text={"Clear Search History"}
            title={"Clears all search history"}
            onClick={onClick}
            noMargin
        />
    )
}