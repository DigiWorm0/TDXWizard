import useTicket from "../../hooks/useTicket";
import React from "react";
import TDXButton from "../common/TDXButton";
import toast from "react-hot-toast";

export default function EditableTicketTitle() {
    const ticket = useTicket();
    const [title, setTitle] = React.useState(ticket?.Title || "");
    const [isEditing, setIsEditing] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (!ticket) return;

        // Find the title element in the document
        const titleElement = document.getElementById("thTicket_spnTitle");
        if (!titleElement)
            throw new Error("Title element not found");

        // Hide it
        titleElement.style.display = "none";

        // Set the title
        setTitle(ticket.Title || "");
    }, [ticket]);

    const onSave = () => {

        // Check if ticket is loaded
        if (!ticket)
            return;

        // Trum the title to remove leading/trailing spaces
        const actualTitle = title.trim();

        // Check if the title has changed
        if (actualTitle === ticket.Title) {
            toast.success(`Title is unchanged: "${actualTitle}"`);
            setIsEditing(false);
            return;
        }

        // Update the ticket title if it has changed
        // const tdxClient = new LocalTDXClient();
        // tdxClient.tickets.updateTicket(ticket.AppID, ticket.ID, {
        //     Title: newTitle
        // }).then(() => {
        //     setIsTitleEdited(false);
        //     // Optionally, you can refresh the ticket data or show a success message
        // }).catch((error) => handleError(`Error updating ticket title to "${newTitle}"`, error));
        toast.success(`Title updated to "${actualTitle}"`);
        setIsEditing(false);
        setTitle(actualTitle.trim());
    }

    const onCancel = () => {
        // Reset the title to the original value
        setTitle(ticket?.Title || "");
        setIsEditing(false);
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "start",
            }}
        >
            {!isEditing && (
                <h1
                    style={{overflowWrap: "break-word"}}
                    onMouseDown={(e) => {
                        // Prevent text selection
                        e.preventDefault();

                        // Enable editing
                        setIsEditing(true)
                    }}
                >
                    {title}
                </h1>
            )}

            {isEditing && (
                <>
                    <input
                        ref={inputRef}
                        type="text"
                        className={"form-control wizard_noPadding"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={(e) => e.target.select()}
                        // onBlur={onCancel}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onSave();
                            } else if (e.key === "Escape") {
                                onCancel();
                            }
                        }}
                        autoFocus={true}

                        style={{
                            fontSize: "1.375rem",
                            fontWeight: 500,
                            lineHeight: "2.18750625rem",
                            fontFamily: "\"DM Sans\", sans-serif",
                            margin: 0,
                            padding: "0px !important",
                            border: "none"
                        }}
                    />

                    <TDXButton
                        onClick={onSave}
                        style={{marginLeft: 10}}
                        icon={"fa fa-save"}
                        title={"Save Title"}
                    />
                </>
            )}
        </div>
    )
}