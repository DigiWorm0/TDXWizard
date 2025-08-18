import useSettings from "../../../hooks/useSettings";
import React from "react";
import CustomTemplate from "../../../types/CustomTemplate";
import useSelectedTemplateID from "../../../hooks/templates/useSelectedTemplateID";

const DEFAULT_TEMPLATE: CustomTemplate = {
    id: 0,
    name: "New Template",
    content: ""
}

export default function CreateTemplateButton() {
    const [settings, setSettings] = useSettings();
    const [, setSelectedTemplateID] = useSelectedTemplateID();

    const createTemplate = React.useCallback(() => {
        // Generate a unique ID based on the current timestamp
        const id = Date.now();

        // Add a new template to the settings
        setSettings({
            ...settings,
            customTemplates: [
                ...settings.customTemplates,
                {...DEFAULT_TEMPLATE, id}
            ]
        });

        // Select the newly created template
        setSelectedTemplateID(id);
    }, [settings, setSettings]);

    return (
        <button
            className={"btn btn-secondary"}
            onClick={createTemplate}
        >
            <span className={"fa fa-plus"} style={{marginRight: 4}}/>
            New Template
        </button>
    )
}