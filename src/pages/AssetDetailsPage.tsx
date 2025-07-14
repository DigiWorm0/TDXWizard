import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import ConvertFeedButton from "../components/betterfeed/ConvertFeedButton";
import AssetNavBar from "../components/inventory/navbar/AssetNavBar";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d+\/Assets\/AssetDet/g;

export default class AssetDetailsPage implements PageScript {
    canRun(): boolean {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run(): void {
        AssetDetailsPage.addBetterFeed();
        AssetDetailsPage.addNavBar();
    }

    static addBetterFeed() {
        const feedRow = document.querySelector("#divFeed .pull-right");
        if (!feedRow)
            throw new Error("Feed Row not found");
        addComponentToDOM(feedRow, <ConvertFeedButton type={"asset"}/>);
    }

    static addNavBar() {
        const navBar = document.querySelector("#divButtons");
        if (!navBar)
            throw new Error("Asset Nav Bar not found");
        addComponentToDOM(navBar, <AssetNavBar/>);
    }
}