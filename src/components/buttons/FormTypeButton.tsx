import TDXButton from "./common/TDXButton";

export interface FormTypeButtonProps {
    name: string;
    iconName?: string;
    typeID: number;
}

export default function FormTypeButton(props: FormTypeButtonProps) {
    const onClick = () => {
        const form = $("#FormID");
        if (!form)
            return;

        form.select2("val", props.typeID, true);
    }

    return (
        <TDXButton
            icon={props.iconName && `fa fa-solid fa-nopad fa-${props.iconName}`}
            text={props.name}
            onClick={() => onClick()}
            title={`Change the form type to ${props.name}`}
        />
    )
}