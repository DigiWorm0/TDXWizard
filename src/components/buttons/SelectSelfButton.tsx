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

        // Abort if the user is not loaded/signed-in
        if (!user)
            return;

        // Get the Kendo Combo Box
        const target = $(`#${props.formID}`);
        if (!target)
            return;

        const comboBox = target.data("kendoComboBox");
        if (!comboBox)
            return;

        // Check if the user is already in the list
        const hasUser = comboBox?.dataSource.data().find((item: any) => item.value === user.UID);

        // If not, add it
        if (!hasUser)
            comboBox.dataSource.add({caption: user.FullName, value: user.UID});

        // Select the user
        comboBox.select((item: any) => item.value === user.UID);

        // Trigger the change event
        comboBox.trigger("change");
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