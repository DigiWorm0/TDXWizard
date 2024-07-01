/**
 * Creates a generic modal with a title, close button, and body.
 * @param title - The title of the modal
 * @returns The parent modal and the modal body
 */
export default function createModal(title: string) {
    // Parent
    const parentModal = document.createElement("div") as HTMLDivElement;
    parentModal.className = "modal fade";
    parentModal.tabIndex = -1;
    parentModal.role = "dialog";
    document.body.appendChild(parentModal);

    // Dialog
    const modalDialog = document.createElement("div") as HTMLDivElement;
    modalDialog.className = "modal-dialog";
    modalDialog.role = "document";
    parentModal.appendChild(modalDialog);

    // Content
    const modalContent = document.createElement("div") as HTMLDivElement;
    modalContent.className = "modal-content";
    modalDialog.appendChild(modalContent);

    // Modal Header
    const modalHeader = document.createElement("div") as HTMLDivElement;
    modalHeader.className = "modal-header";
    modalHeader.style.cursor = "auto"; // Why is TDX using cursor:move?
    modalContent.appendChild(modalHeader);

    // Close Button
    const closeButton = document.createElement("button") as HTMLButtonElement;
    closeButton.className = "close";
    closeButton.type = "button";
    closeButton.dataset.dismiss = "modal";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = () => $(parentModal).modal("hide");
    modalHeader.appendChild(closeButton);

    // Header Title
    const headerTitle = document.createElement("h4") as HTMLHeadingElement;
    headerTitle.className = "modal-title";
    headerTitle.innerText = title;
    modalHeader.appendChild(headerTitle);

    // Modal Body
    const modalBody = document.createElement("div") as HTMLDivElement;
    modalBody.className = "modal-body";
    modalContent.appendChild(modalBody);

    return {
        parentModal,
        modalBody
    }
}