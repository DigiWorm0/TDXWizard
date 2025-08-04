import useSettings from "../../../hooks/useSettings";
import useSelectedTemplate from "../../../hooks/templates/useSelectedTemplate";
import React from "react";


export default function TemplateTitleInput() {
    const [settings, setSettings] = useSettings();
    const [template, setTemplate] = useSelectedTemplate();

    const setTitle = React.useCallback((title: string) => {
        if (!template)
            return;
        setTemplate({...template, name: title});
    }, [settings, setSettings]);

    return (
        <input
            type={"text"}
            className={"form-control"}
            placeholder={"Template Title"}
            value={template ? template.name : ""}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!template}
            style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginBottom: 10,
                marginTop: 10
            }}
        />
    )
}