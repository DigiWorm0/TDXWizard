import TemplateTextInput from "./TemplateTextInput";
import TemplateTitleInput from "./TemplateTitleInput";
import DeleteTemplateButton from "./DeleteTemplateButton";

export default function TemplateEditorPanel() {
    return (
        <div>
            <TemplateTitleInput/>
            <TemplateTextInput/>
            {/*<TemplateShortcutInput/>*/}
            <DeleteTemplateButton/>
        </div>
    )
}