import React from "react";
import useTemplateEditorOpen from "../../hooks/templates/useTemplateEditorOpen";

export default function EditTemplatesButton() {
    const [, setEditorOpen] = useTemplateEditorOpen();

    const onEditTemplates = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // e.stopPropagation(); // <-- Allow propagation to let the dropdown close

        // Open the modal to edit templates
        setEditorOpen(true);
    }

    return (
        <li>
            <a
                href={"#"}
                onClick={onEditTemplates}
                title={"Opens a modal to edit existing templates."}
            >
                <span className={"fa fa-pencil"} style={{marginRight: 4}}/>
                Edit Templates
            </a>
        </li>
    )
}