import React from "react";

export default function useErrorHandling() {
    const [errors, setErrors] = React.useState<string | null>(null);

    const onError = (message: string) => {
        console.error(message);
        setErrors(currentErrors => `${currentErrors ? currentErrors + "\n" : ""}${message}`);
    }

    const clearErrors = () => {
        setErrors(null);
    }

    return [errors, onError, clearErrors] as const;
}