import useMyUser from "../../hooks/useMyUser";
import React from "react";

export interface SelectSelfButtonProps {
    formID: string;
}

export default function SelectSelfButton(props: SelectSelfButtonProps) {
    const user = useMyUser();

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent the button from submitting the form
        e.preventDefault();
        if (!user)
            return;

        // Get the select2 element
        const target = $(`#${props.formID}`);
        if (!target)
            return;

        // Set the new value and trigger the change event
        target.select2("data", {
            caption: user.FullName,
            value: user.UID
        }, true);
    }

    return (
        <>
            <button
                className={"btn btn-default"}
                title={"Select Yourself"}
                disabled={!user}
                onClick={onClick}
            >
                <i className={"fa-solid fa-fw fa-nopad fa-user gray"}/>
                <span className={"sr-only"}>
                {props.formID}
            </span>
            </button>

            {/* Span prevent the button from being the last element for CSS */}
            <span/>
        </>
    )
}