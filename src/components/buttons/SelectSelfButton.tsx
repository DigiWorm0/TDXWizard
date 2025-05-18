import useMyUser from "../../hooks/useMyUser";
import React from "react";

export interface SelectSelfButtonProps {
    formID: string;
}

export default function SelectSelfButton(props: SelectSelfButtonProps) {
    const [isHovered, setIsHovered] = React.useState(false);
    const user = useMyUser();

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Prevent the button from submitting the form
        e.preventDefault();
        if (!user)
            return;

        // Get the select2 element
        const target = $(`#${props.formID}`);
        if (!target)
            return;

        const comboBox = target.data("kendoComboBox");

        // Set the new value and trigger the change event
        comboBox?.value(user.FullName);
        // comboBox?.value({
        //     caption: user.FullName,
        //     value: user.UID
        // });
    }

    return (
        <a
            role={"button"}
            type={"button"}
            title={"Select Yourself"}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                color: isHovered ? "#34295b" : "#817ba3",
            }}
        >
            <i className={"fa-solid fa-fw fa-nopad fa-user"}/>
        </a>
    )
}