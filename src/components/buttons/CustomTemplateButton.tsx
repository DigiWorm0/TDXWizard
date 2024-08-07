import React from "react";
import useSettings from "../../hooks/useSettings";
import CustomTemplate from "../../types/CustomTemplate";
import useTicket from "../../hooks/useTicket";
import useUser from "../../hooks/useUser";

export interface CustomTemplateButtonProps {
    template: CustomTemplate;
}

export default function CustomTemplateButton(props: CustomTemplateButtonProps) {
    const [settings, setSettings] = useSettings();
    const ticket = useTicket();
    const requestor = useUser(ticket?.RequestorUid);
    const responsible = useUser(ticket?.ResponsibleUid);

    const {template} = props;

    const onTemplateClick = (e: React.MouseEvent<HTMLAnchorElement>, templateID: number) => {
        e.preventDefault();
        e.stopPropagation();

        // Hide the dropdown
        $(e.target).closest(".dropdown-menu").hide();

        // Check if the shift key is pressed
        if (e.shiftKey) {

            // Confirm the user wants to delete the template
            if (!confirm("Are you sure you want to delete this template?"))
                return;

            // Remove the template from the settings
            setSettings({
                ...settings,
                customTemplates: settings.customTemplates.filter(template => template.id !== templateID)
            });

            return;
        }

        // Placeholder Data
        const placeholderData = {
            "TechnicianFullName": responsible?.FullName,
            "TechnicianFirstName": responsible?.FirstName,
            "TechnicianLastName": responsible?.LastName,
            "TechnicianNickOrFirstName": responsible?.Nickname || responsible?.FirstName,
            "TechnicianFullNameWithNickname": `${responsible?.FullName} (${responsible?.Nickname})`,
            "TechnicianSignature": responsible?.TechnicianSignature, // TODO: Implement
            "RequestorFullName": requestor?.FullName,
            "RequestorFirstName": requestor?.FirstName,
            "RequestorLastName": requestor?.LastName,
            "LastModifiedDate": ticket?.ModifiedDate,
            "TicketID": `${ticket?.ID}`
        };

        // Replace placeholder values in the template
        // @ts-ignore TDX has Mustache loaded globally
        const templateData = Mustache.render(template.content, placeholderData);

        // Get the CKEditor instance
        const commentEditor = CKEDITOR.instances["Comments_Content"];
        if (!commentEditor)
            throw new Error("CKEditor instance not found");

        // Set the data
        commentEditor.setData(templateData);

        // Close template dropdown
        $("div.dropdown").removeClass("open");
    }

    return (
        <li>
            <a
                className={"js-template"}
                href={"javascript:;"}
                onClick={(e) => onTemplateClick(e, template.id)}
                title={"Shift + Click to delete"}
            >
                {template.name}
            </a>
        </li>
    )
}