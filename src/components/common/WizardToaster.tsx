import toast, {ToastBar, Toaster} from "react-hot-toast";

export default function WizardToaster() {
    return (
        <Toaster
            toastOptions={{duration: 4000}}
            position={"bottom-right"}
        >
            {t => (
                <ToastBar
                    toast={t}
                    style={{
                        borderLeft:
                            t.type === "success" ? "8px solid #4caf50" :
                                t.type === "error" ? "8px solid #f44336" :
                                    "8px solid #2196f3",
                        animation: t.visible ?
                            "wizard_slideInRight 0.3s ease-in-out forwards" :
                            "wizard_slideOutRight 0.3s ease-in-out forwards",
                    }}
                >
                    {({icon, message}) => (
                        <>
                            {icon}
                            {message}

                            {/* Dismiss button for non-loading toasts */}
                            {t.type !== "loading" && (
                                <button
                                    aria-label="Dismiss"
                                    onClick={() => toast.dismiss(t.id)}
                                    style={{
                                        marginLeft: "8px",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: "#888"
                                    }}
                                >
                                    <i className="fa fa-solid fa-times"/>
                                </button>
                            )}
                        </>
                    )}
                </ToastBar>
            )}
        </Toaster>
    )
}