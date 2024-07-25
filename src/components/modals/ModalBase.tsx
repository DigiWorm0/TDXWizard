import React from "react";

export interface ModalBaseProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export default function ModalBase(props: ModalBaseProps) {
    const modalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (props.isOpen) {
            $(modalRef.current!).modal("show");
        } else {
            $(modalRef.current!).modal("hide");
        }
    }, [props.isOpen]);

    React.useEffect(() => {
        $(modalRef.current!).on("hidden.bs.modal", props.onClose);
        return () => {
            $(modalRef.current!).off("hidden.bs.modal", props.onClose);
        };
    }, []);

    return (
        <>
            {/* Seperated backdrop to fix child CSS issues */}
            <div
                className={`modal-backdrop fade ${props.isOpen ? "in" : ""}`}
                style={{pointerEvents: "none"}}
            />

            {/* Modal */}
            <div
                className={"modal fade"}
                tabIndex={-1}
                role={"dialog"}
                ref={modalRef}
                data-backdrop={false}
            >
                {props.children}
            </div>
        </>
    );
}