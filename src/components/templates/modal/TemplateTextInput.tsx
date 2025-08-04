import React from "react";
import CKEditor, {CKEditorRef} from "../../common/CKEditor";
import useSelectedTemplate from "../../../hooks/templates/useSelectedTemplate";
import useSelectedTemplateID from "../../../hooks/templates/useSelectedTemplateID";

export default function TemplateTextInput() {
    const editorRef = React.useRef<CKEditorRef>(null);
    const [selectedTemplateID] = useSelectedTemplateID();
    const [template, setTemplate] = useSelectedTemplate();

    const setTemplateContent = React.useCallback((content: string) => {
        if (!template)
            return;
        setTemplate({...template, content});
    }, [template, setTemplate]);

    React.useEffect(() => {
        if (editorRef.current && template)
            editorRef.current.setContent(template.content);
    }, [selectedTemplateID]);

    if (!template)
        return;

    return (
        <CKEditor
            initialContent={template.content}
            onChange={setTemplateContent}
            ref={editorRef}
        />
    )
}