import useSettings from "../../hooks/useSettings";
import DefaultCustomTemplates from "../../db/DefaultCustomTemplates";
import React from "react";

export default function ResetCustomTemplatesButton() {
    const [settings, setSettings] = useSettings();

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to reset your custom templates?"))
            return;

        setSettings({
            ...settings,
            customTemplates: DefaultCustomTemplates
        });
    }

    return (
        <button
            className={"btn btn-default"}
            title={"Reset Custom Templates"}
            onClick={onClick}
            style={{marginRight: 0}}
        >
            <i className={"fa-solid fa-fw fa-nopad fa-undo"}/>
            <span>
                Reset Templates
            </span>
        </button>
    )
}