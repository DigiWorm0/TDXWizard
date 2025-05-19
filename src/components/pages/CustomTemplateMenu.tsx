import React from "react";
import useSettings from "../../hooks/useSettings";
import CustomTemplateButton from "../buttons/CustomTemplateButton";
import AddTemplateButton from "../buttons/AddTemplateButton";

export default function CustomTemplateMenu() {
    const [settings] = useSettings();
    const linkRef = React.useRef<HTMLAnchorElement>(null);

    const onMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Close all other dropdowns
        $("ul.dropdown-menu [data-toggle=dropdown]").parent().removeClass("open");

        // Open the dropdown
        $(e.target).parent().addClass("open");

        // Fix Dropdown Menu
        $(e.target).next().css({
            display: ""
        });
    }

    return (
        <>
            {/* My Templates */}
            <a
                tabIndex={-1}
                href={"#"}
                data-toggle={"dropdown"}
                ref={linkRef}
                onClick={onMenuClick}
                className={"dropdown-item dropdown-toggle"}
            >
                My Templates
            </a>

            {/* Dropdown */}
            <ul className={"dropdown-menu"}>
                {settings.customTemplates.map(template =>
                    <CustomTemplateButton
                        key={template.id}
                        template={template}
                    />
                )}
                <hr
                    style={{
                        marginTop: 8,
                        marginBottom: 8
                    }}
                    className="dropdown-divider"
                />
                <AddTemplateButton/>
            </ul>
        </>
    )
}