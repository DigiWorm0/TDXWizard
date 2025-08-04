import React, {useImperativeHandle} from "react";

export interface CKEditorRef {
    setContent: (content: string) => void;
}

export interface CKEditorProps {
    initialContent: string;
    onChange: (newContent: string) => void;
    ref: React.RefObject<CKEditorRef>;
}

const ALLOWED_CONTENT = "h1 h2 h3 h4 h5 h6 ul ol li div p hr blockquote pre center span br wbr a img b i u s em strong mark ins del sup sub small q code kbd samp var font strike table thead tfoot tbody tr th td colgroup col caption[class,type,start,value,href,src,alt,style,size,color,face,data-image-url,colspan,rowspan,scope,nowrap,data-widget,data-cke-upload-id,title]{color,width,height,font,font-family,font-size,font-stretch,font-style,font-variant,font-weight,line-height,letter-spacing,word-spacing,text-align,text-decoration,text-decoration-line,text-decoration-color,text-decoration-style,text-transform,list-style,list-style-image,list-style-position,list-style-type,counter-increment,counter-reset,margin,margin-left,margin-right,margin-top,margin-bottom,padding,padding-left,padding-right,padding-top,padding-bottom,max-width,max-height,display}(table,table-responsive,table-striped,table-hover,table-bordered,table-condensed)";

export default function CKEditor(props: CKEditorProps) {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const editorRef = React.useRef<CKEDITOR.editor | null>(null);

    React.useEffect(() => {
        if (!textareaRef.current)
            return;

        // Set ref to the editor instance
        editorRef.current = CKEDITOR.replace(textareaRef.current, {
            title: "Template Editor",
            allowedContent: ALLOWED_CONTENT,
            disallowedContent: "a[type]",
            format_tags: "h1;h2;h3;h4;h5;h6;pre",
            enterMode: 2,
            image_previewText: " ",
            contentsCss: [
                "/TDPortal/Content/ckeditor/contents.css",
                "/TDPortal/Content/FontAwesome/css/fontawesome.min.css",
                "/TDPortal/Content/FontAwesome/css/brands.min.css",
                "/TDPortal/Content/FontAwesome/css/regular.min.css",
                "/TDPortal/Content/FontAwesome/css/solid.min.css",
                "/TDPortal/Content/FontAwesome/css/v4-shims.min.css"
            ],
            baseHref: "/TDPortal/Content/ckeditor/",
            toolbar: "TDFeed",
            removePlugins: "magicline,devtools,templates,liststyle,tabletools,contextmenu,image,simpleimage,uploadimage"
        });

        // Set initial content
        if (props.initialContent)
            editorRef.current.setData(props.initialContent);

        return () => {
            // Destroy the editor instance on unmount
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        }
    }, []);

    React.useEffect(() => {
        const onChange = () => {
            props.onChange(editorRef.current?.getData() || "");
        }

        editorRef.current?.on('change', onChange);
        return () => {
            editorRef.current?.removeListener('change', onChange);
        }
    }, [props.onChange]);

    useImperativeHandle(props.ref, () => ({
        setContent: (content: string) => editorRef.current?.setData(content)
    }), [editorRef]);

    return (
        <textarea
            ref={textareaRef}
            data-val-maxlength-ckeditor={"Templates cannot be longer than 20,000 characters (including formatting characters)."}
            data-val-maxlength-max-ckeditor={20000}
            rows={2}
            cols={20}
            style={{display: "none"}}
        />
    )
}