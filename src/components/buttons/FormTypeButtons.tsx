import useSettings from "../../hooks/useSettings";
import FormTypeButton from "./FormTypeButton";

export default function FormTypeButtons() {
    const [settings] = useSettings();

    // Disabled
    if (!settings.suggestFormTypes)
        return null;
    return (
        <div
            style={{margin: "5px 2px"}}
        >
            <FormTypeButton name={"Reimage"} typeID={1041} iconName={"hard-drive"}/>
            <FormTypeButton name={"Repair"} typeID={9281} iconName={"hammer"}/>
        </div>
    )
}