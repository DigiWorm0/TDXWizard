import PageScript from "../PageScript";
import addComponentToDOM from "../../utils/ui/addComponentToDOM";
import AssetNavBar from "../../components/pages/AssetNavBar";

const URL_PREFIX = "/TDNext/Apps/44/Assets/AssetDet";

export default class AssetDetailsPage implements PageScript {
    canRun(): boolean {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run(): void {
        const assetNavBar = document.getElementById("divButtons");
        if (!assetNavBar)
            throw new Error("Nav Bar not found");
        addComponentToDOM(assetNavBar, <AssetNavBar/>);
    }

}