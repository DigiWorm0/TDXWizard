import useUser from "../../../hooks/useUser";
import getPersonIDFromURL from "../../../tdx-api/utils/getPersonIDFromURL";
import TDXButton from "../../common/TDXButton";
import useSettings from "../../../hooks/useSettings";

export default function UserDebugInfoButton() {
    const [settings] = useSettings();
    const user = useUser(getPersonIDFromURL());

    if (!settings.developerMode)
        return null;
    return (
        <TDXButton
            onClick={() => {
                // eslint-disable-next-line no-console
                console.log("User Debug Info:", user);
            }}
            text={"Debug Info"}
            icon={"fa fa-code"}
        />
    );

}