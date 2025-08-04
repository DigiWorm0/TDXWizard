import useSettings from "../../../hooks/useSettings";
import React from "react";
import useSelectedTemplateID from "../../../hooks/templates/useSelectedTemplateID";

export default function DeleteTemplateButton() {
    const [settings, setSettings] = useSettings();
    const [selectedTemplateID, setSelectedTemplateID] = useSelectedTemplateID();

    const deleteTemplate = React.useCallback(() => {
        // Check if a template is selected
        if (selectedTemplateID === null)
            return;

        // Remove the selected template from the settings
        setSettings({
            ...settings,
            customTemplates: settings.customTemplates.filter(t => t.id !== selectedTemplateID)
        });

        // Deselect the template
        setSelectedTemplateID(null);
    }, [settings, setSettings]);

    return (
        <button
            className={"btn btn-secondary"}
            onClick={deleteTemplate}
            style={{marginTop: 10}}
        >
            <span className={"fa fa-trash"} style={{marginRight: 4}}/>
            Delete Template
        </button>
    )
}