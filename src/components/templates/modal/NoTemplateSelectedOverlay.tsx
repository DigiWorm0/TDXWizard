export default function NoTemplateSelectedOverlay() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: 50
            }}
        >
            <span
                className={"fa-regular fa-message"}
                style={{
                    fontSize: "52px",
                    color: "#bbb",
                    marginBottom: 10,
                }}
            />
            <h4 className={"text-muted"}>
                No Template Selected
            </h4>
            <p className={"text-muted"} style={{marginTop: 2}}>
                Please select a template from the menu on the left to edit.
            </p>
        </div>
    )
}