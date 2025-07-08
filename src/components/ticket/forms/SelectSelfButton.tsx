import useMyUser from "../../../hooks/useMyUser";
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
            throw new Error("Target element not found");

        // Kendo UI ComboBox
        const kendoBox = target.data("kendoComboBox");
        if (kendoBox) {

            // Check if the user is already in the list
            const hasUser = kendoBox?.dataSource.data().find((item: any) => item.value === user.UID);

            // If not, add it
            if (!hasUser)
                kendoBox.dataSource.add({caption: user.FullName, value: user.UID});

            // Select the user
            kendoBox.select((item: any) => item.value === user.UID);

            // Trigger the change event
            kendoBox.trigger("change");

            return;
        }

        // TDX Internal
        const tdxTextBox = document.getElementById(`${props.formID}_txttaluResponsible`);
        if (tdxTextBox) {
            if (!tdxTextBox.addItem)
                throw new Error("tdxTextBox does not have addItem method");

            // Add Item to the TDX TextBox
            tdxTextBox.addItem(user.FullName, user.UID, {
                __type: "TeamDynamix.Domain.Users.EligibleAssignmentDto",
                displayName: user.FullName,
                email: user.PrimaryEmail,
                id: user.UID,
                isUser: true,
                name: user.FullName,
                rate: 0
            }, true);

            return;
        }

        throw new Error("No valid form found with the given ID: " + props.formID);
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
                height: "1.875rem"
            }}
        >
            <i className={"fa fa-user"}/>
        </a>
    )
}