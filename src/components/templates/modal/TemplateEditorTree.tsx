import React from "react";
import useSettings from "../../../hooks/useSettings";
import CustomTemplate from "../../../types/CustomTemplate";
import {ReactSortable} from "react-sortablejs";

export interface TemplateEditorTreeProps {
    onSelectTemplate: (id: number) => void;
    selectedTemplateID: number | null;
}

export default function TemplateEditorTree(props: TemplateEditorTreeProps) {
    const [settings, setSettings] = useSettings();

    const {onSelectTemplate, selectedTemplateID} = props;
    const {customTemplates} = settings;

    const setCustomTemplates = React.useCallback((templates: CustomTemplate[]) => {
        setSettings({
            ...settings,
            customTemplates: templates
        });
    }, [settings, setSettings]);

    return (
        <ReactSortable
            list={customTemplates}
            setList={setCustomTemplates}
            className={"list-group"}
            animation={150}
            style={{
                marginBottom: 10
            }}
        >
            {settings.customTemplates.map((template) => (
                <button
                    key={template.id}
                    className={`list-group-item list-group-item-action ${selectedTemplateID === template.id ? "active" : ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        onSelectTemplate(template.id);
                    }}
                    style={{color: "var(--visited-link-color)"}}
                >
                    {template.name}
                </button>
            ))}
        </ReactSortable>
    )


}