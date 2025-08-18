import useSettings from "../../../hooks/useSettings";
import useSelectedTemplate from "../../../hooks/templates/useSelectedTemplate";
import React from "react";

export default function TemplateShortcutInput() {
    const [settings, setSettings] = useSettings();
    const [template, setTemplate] = useSelectedTemplate();

    const setShortcut = React.useCallback((shortcut: string) => {
        if (!template)
            return;
        setTemplate({...template, shortcut});
    }, [settings, setSettings]);

    return (
        <input
            type={"text"}
            className={"form-control"}
            placeholder={"Shortcut"}
            title={"Typing this into the editor and hitting Enter will auto-populate the template content."}
            value={template?.shortcut || ""}
            onChange={(e) => setShortcut(e.target.value)}
            disabled={!template}
            maxLength={50}
            style={{
                marginTop: 10
            }}
        />
    )
}