import PageScript from "./PageScript";
import addComponentToDOM from "../utils/addComponentToDOM";
import ConvertFeedButton from "../components/buttons/ConvertFeedButton";

const URL_PREFIX_REGEX = /\/TDNext\/Apps\/\d+\/Tickets\/TicketTaskDet/g;

export default class TicketTaskPage implements PageScript {
    canRun(): boolean {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run(): void {
        TicketTaskPage.addBetterFeed();
    }

    static addBetterFeed() {
        const feedRow = document.querySelector("#divFeed .pull-right");
        if (!feedRow)
            throw new Error("Feed Row not found");
        addComponentToDOM(feedRow, <ConvertFeedButton type={"ticketTask"}/>);
    }

}