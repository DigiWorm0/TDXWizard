import React from "react";
import useSettings from "../../hooks/useSettings";
import CustomTemplate from "../../types/CustomTemplate";

export default function CustomTemplateMenu() {
    const [settings, setSettings] = useSettings();
    const linkRef = React.useRef<HTMLAnchorElement>(null);

    const onMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Open the dropdown
        if (!e.target)
            return;
        $(e.target).next().toggle();
    }

    const onTemplateClick = (e: React.MouseEvent<HTMLAnchorElement>, templateID: number) => {
        // Hide the dropdown
        $(e.target).closest(".dropdown-menu").hide();

        // Check if the shift key is pressed
        if (!e.shiftKey)
            return;
        e.preventDefault();
        e.stopPropagation();

        // Confirm the user wants to delete the template
        if (!confirm("Are you sure you want to delete this template?"))
            return;

        // Remove the template from the settings
        setSettings({
            ...settings,
            customTemplates: settings.customTemplates.filter(template => template.id !== templateID)
        });
    }

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
        }

        // Add the template to the settings
        setSettings({
            ...settings,
            customTemplates: [
                ...settings.customTemplates,
                newTemplate
            ]
        })
    }

    return (
        <>
            <a
                tabIndex={-1}
                href={"javascript:;"}
                data-toggle={"dropdown"}
                ref={linkRef}
                onClick={onMenuClick}
                className={"dropdown-item dropdown-toggle"}
            >
                My Templates
            </a>
            <ul className={"dropdown-menu"}>
                {settings.customTemplates.map(template => (
                    <li key={template.id}>
                        <a
                            className={"js-template"}
                            href={"javascript:;"}
                            data-template={template.content}
                            onClick={(e) => onTemplateClick(e, template.id)}
                        >
                            {template.name}
                        </a>
                    </li>
                ))}

                <li>
                    <a
                        href={"javascript:;"}
                        onClick={onAddTemplate}
                    >
                        Add New Template
                    </a>
                </li>
            </ul>
        </>
    )
}