import React from "react";
import useSettings from "../../hooks/useSettings";
import CustomTemplate from "../../types/CustomTemplate";

export default function AddTemplateButton() {
    const [settings, setSettings] = useSettings();

    const onAddTemplate = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Prompt the user for a name
        const name = prompt("Enter a name for the template:");
        if (!name)
            return;

        // Get the content from the WYSIWYG editor
        const wysiwyg = document.querySelector("#divComments iframe") as HTMLIFrameElement;
        if (!wysiwyg)
            return;

        const content = wysiwyg.contentWindow?.document.body.innerHTML;
        if (!content)
            return;

        // Create a new template
        const newTemplate: CustomTemplate = {
            id: Math.random(),
            name,
            content: `<p>${content}</p>`
        };

        // Add the template to the settings
        setSettings({
            ...settings,
            customTemplates: [
                ...settings.customTemplates,
                newTemplate
            ]
        });
    }

    return (
        <li>
            <a
                href={"#"}
                onClick={onAddTemplate}
                title={"This will make a template using the current ticket comments."}
            >
                <span className={"fa fa-plus"} style={{marginRight: 4}}/>
                Add Template
            </a>
        </li>
    )
}