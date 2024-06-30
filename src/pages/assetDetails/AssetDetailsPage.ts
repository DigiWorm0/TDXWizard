import PageScript from "../PageScript";
import addNavButton from "../ticketDetails/addNavButton";
import updateAsset from "../../utils/tdx/updateAsset";

const URL_PREFIX = "/TDNext/Apps/44/Assets/AssetDet";

export default class AssetDetailsPage implements PageScript {
    canRun(): boolean {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run(): void {
        AssetDetailsPage.addSurplusButton();
    }

    static addSurplusButton() {
        addNavButton(
            () => updateAsset({
                owner: "",
                status: "Surplus",
                owningDepartment: "Surplus (Inv Dept)"
            }),
            "Surplus",
            "arrow-right-arrow-left",
            "Mark Asset as Surplus"
        );
    }
}