export interface TemplateEditorHeaderProps {
    onClose: () => void;
}

export default function TemplateEditorHeader(props: TemplateEditorHeaderProps) {
    return (
        <>
            <div className={"d-flex flex-row justify-content-between"}>
            <span
                style={{
                    fontFamily: "\"DM Sans\",sans-serif",
                    fontWeight: "bold",
                    fontSize: 30
                }}
            >
                My Templates
            </span>
                <button
                    type={"button"}
                    className={"close tdx-close-x"}
                    data-dismiss={"modal"}
                    aria-label={"Close"}
                    onClick={props.onClose}
                    style={{margin: 10}}
                />
            </div>
            <hr style={{marginTop: 6, marginBottom: 12}}/>
        </>
    );
}