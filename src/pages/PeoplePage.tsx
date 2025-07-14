import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import PeopleNavBar from "../components/people/navbar/PeopleNavBar";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/People\/PersonDet/g;

export default class PeoplePage implements PageScript {
    canRun(): boolean {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run(): void {
        PeoplePage.addNavBar();
    }

    static addNavBar() {
        const navBar = document.querySelector("#divButtons");
        if (!navBar)
            throw new Error("People Nav Bar not found");
        addComponentToDOM(navBar, <PeopleNavBar/>);
    }
}