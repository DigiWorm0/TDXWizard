import TDXButton from "../../common/TDXButton";
import useSettings from "../../../hooks/useSettings";
import useAsset from "../../../hooks/useAsset";

export default function AssetDebugInfoButton() {
    const [settings] = useSettings();
    const asset = useAsset();

    if (!settings.developerMode)
        return null;
    return (
        <TDXButton
            onClick={() => {
                // eslint-disable-next-line no-console
                console.log("Asset Debug Info:", asset);
            }}
            text={"Debug Info"}
            icon={"fa fa-code"}
        />
    );

}