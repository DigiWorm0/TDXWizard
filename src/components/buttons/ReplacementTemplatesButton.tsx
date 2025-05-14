import CustomTemplateMenu from "../pages/CustomTemplateMenu";

export default function ReplacementTemplatesButton() {
    return (
        <>
            <a
                className="dropdown-toggle"
                href="javascript:"
                id="lnkShowTemplates"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Templates
                <span className="caret"/>
            </a>
            <ul
                className="dropdown-menu multi-level"
                aria-labelledby="lnkShowTemplates"
            >
                <li className={"dropdown-submenu"}>
                    <CustomTemplateMenu/>
                </li>
            </ul>
        </>
    )
}