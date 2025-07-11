import useTicket from "../../hooks/useTicket";
import React from "react";
import TDXButton from "../common/TDXButton";
import getTextWidth from "../../utils/getTextWidth";
import LocalTDXClient from "../../tdx-api/LocalTDXClient";
import toast from "react-hot-toast";
import useRunPromise from "../../hooks/useRunPromise";
import handleError from "../../utils/handleError";
import TDXButtonGroup from "../common/TDXButtonGroup";

const FONT_FAMILY = "1.375rem DM Sans, sans-serif";

export default function EditableTicketTitle() {
    const ticket = useTicket();
    const [title, setTitle] = React.useState(ticket?.Title || "");
    const [isEdited, setIsEdited] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [runPromise, isLoading] = useRunPromise();

    // Calculate the width of the input based on the title length
    const width = React.useMemo(() => {
        const padding = 20; // Padding in pixels
        const maxWidth = 600; // Maximum width in pixels

        // Calculate the width of the title text
        return Math.min(getTextWidth(title, FONT_FAMILY) + padding, maxWidth);
    }, [title]);

    // Wait to replace the existing ticket title until the ticket is loaded
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

    // Save the title to the ticket
    const onSave = () => {
        // Check if ticket is loaded
        if (!ticket)
            return;

        // Check if already loading
        if (isLoading)
            return;

        // Trim the title to remove leading/trailing spaces
        const actualTitle = title.trim();

        // Check if the title has changed
        if (actualTitle === ticket.Title) {
            // Reset to original title
            onCancel();
            return;
        }

        // Hide the save icon immediately
        setIsEdited(false);

        // Remove focus from the input
        inputRef.current?.blur();

        // Update the ticket title if it has changed
        const tdxClient = new LocalTDXClient();
        runPromise(tdxClient.tickets.updateTicket(ticket.AppID, ticket.ID, {Title: actualTitle})
            .then(() => {
                // Update the title
                setTitle(actualTitle);
                ticket.Title = actualTitle;

                // Toast success message
                toast.success(`Title updated to "${actualTitle}"`);
            })
            .catch((e) => {
                // Handle error and show toast
                handleError(`Error updating ticket title to "${actualTitle}"`, e);

                // Reset to original title
                onCancel();
            }));
    }

    // Revert the title to the original value
    const onCancel = () => {
        // Check if ticket is loaded
        if (!ticket)
            return;

        // Check if already loading
        if (isLoading)
            return;

        // Reset the title to the original value
        setTitle(ticket.Title || "");

        // Remove focus from the input
        inputRef.current?.blur();

        // Hide the save icon
        setIsEdited(false);
    }

    if (!ticket)
        return null;
    return (
        <div style={{display: "inline-block"}}>
            <div style={{display: "flex"}}>
                <input
                    ref={inputRef}
                    type="text"
                    className={"form-control wizard_noPadding"}
                    value={title}
                    disabled={isLoading}
                    onChange={(e) => {
                        // Update the title state
                        setTitle(e.target.value);

                        // Show/Hide the save icon based on whether the title has changed
                        const isChanged = e.target.value.trim() !== ticket.Title.trim();
                        setIsEdited(isChanged);
                    }}
                    onKeyDown={(e) => {
                        // Save on Enter
                        if (e.key === "Enter")
                            onSave();

                        // Cancel on Escape
                        else if (e.key === "Escape")
                            onCancel();
                        else
                            return;

                        // Prevent default behavior
                        e.preventDefault();
                    }}
                    onBlur={(e) => {
                        // Check if the input is empty
                        if (e.target.value.trim() === "")
                            onCancel(); // Abort to avoid empty title
                    }}

                    style={{
                        fontSize: "1.375rem",
                        fontWeight: 500,
                        lineHeight: "2.18750625rem",
                        fontFamily: "\"DM Sans\", sans-serif",
                        backgroundColor: "transparent",
                        margin: 0,
                        padding: "0px !important",
                        border: "none",
                        width: width
                    }}
                />

                {isLoading && (
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span className={"fa fa-spinner fa-spin"}/>
                    </div>
                )}

                {isEdited && (
                    <TDXButtonGroup>
                        <TDXButton
                            noMargin
                            onClick={onSave}
                            disabled={isLoading}
                            icon={"fa fa-save"}
                            title={"Save Title"}
                        />
                        <TDXButton
                            noMargin
                            onClick={onCancel}
                            disabled={isLoading}
                            icon={"fa fa-times"}
                            title={"Cancel Title Edit"}
                        />
                    </TDXButtonGroup>
                )}
            </div>
        </div>
    )
}