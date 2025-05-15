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
        <button
            className={"btn btn-success btn-sm"}
            type={"button"}
            onClick={() => onClick()}
            title={`Change the form type to ${props.name}`}
        >
            {props.iconName && (
                <span className={`fa fa-solid fa-nopad fa-${props.iconName}`}/>
            )}
            <span className={"hidden-xs padding-left-xs"}>
                {props.name}
            </span>
        </button>
    )
}