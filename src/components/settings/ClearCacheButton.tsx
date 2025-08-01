import TDXButton from "../common/TDXButton";
import React from "react";
import toast from "react-hot-toast";
import {clearCache} from "../../utils/atomWithCache";

export default function ClearCacheButton() {

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        clearCache();
        toast.success("TDXWizard cache cleared successfully!");
    }

    return (
        <TDXButton
            intent={"primary"}
            icon={"fa fa-cookie-bite me-1"}
            text={"Clear Local Cache"}
            title={"Clears all cached users, groups, types, and applications"}
            onClick={onClick}
            noMargin
        />
    )
}