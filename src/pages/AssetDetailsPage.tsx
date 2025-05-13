import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import AssetNavBar from "../components/pages/AssetNavBar";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d+\/Assets\/AssetDet/g;

export default class AssetDetailsPage implements PageScript {
    canRun(): boolean {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run(): void {
        const assetNavBar = document.getElementById("divButtons");
        if (!assetNavBar)
            throw new Error("Nav Bar not found");
        addComponentToDOM(assetNavBar, <AssetNavBar/>);
    }

}