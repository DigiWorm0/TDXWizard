import PageScript from "../PageScript";
import addNavButton from "../ticketDetails/addNavButton";
import updateAsset from "../../utils/tdx/updateAsset";
import scrapeAssetInfo from "./scrapeAssetInfo";
import AssetInfo from "../../types/AssetInfo";
import makeTicket from "../../utils/tdx/makeTicket";
import { GM_notification, GM_setClipboard } from "$";
import confirmAction from "../../utils/confirmAction";

const URL_PREFIX = "/TDNext/Apps/44/Assets/AssetDet";

export default class AssetDetailsPage implements PageScript {
    canRun(): boolean {
        return window.location.pathname.startsWith(URL_PREFIX);
    }

    run(): void {
        const assetInfo = scrapeAssetInfo();

        AssetDetailsPage.addSurplusButton(assetInfo);
        AssetDetailsPage.addSurplusTicketButton(assetInfo);
    }

    static addSurplusButton(assetInfo: AssetInfo) {
        if (assetInfo.status === "Surplus")
            return;

        addNavButton(
            () => {
                if (confirmAction("Mark this asset as Surplus?"))
                    updateAsset({
                        owner: "",
                        status: "Surplus",
                        owningDepartment: "Surplus (Inv Dept)"
                    }).catch(console.error);
            },
            "Surplus",
            "arrow-right-arrow-left",
            "Mark Asset as Surplus"
        );
    }

    static addSurplusTicketButton(assetInfo: AssetInfo) {
        //if (assetInfo.status !== "Surplus")
        //    return;

        addNavButton(
            () => {
                if (confirmAction("Make a surplus ticket for this asset?"))
                    this._makeSurplusTicket(assetInfo).catch(console.error);
            },
            "Surplus Ticket",
            "ticket",
            "Make a new Surplus Ticket"
        );
    }

    static async _makeSurplusTicket(assetInfo: AssetInfo) {
        const newTicket = await makeTicket({
            requester: "Gretchen Yonko",
            notifyRequester: false,
            title: "Device Surplus Requested",
            description: `Surplussing device ${assetInfo.assetTag} (In PC-Repair)`,
            type: "Return",
            tags: ["Surplus"],
            assetName: assetInfo.assetTag,
            responsibility: "PC Repair",
            notifyResponsible: false,
            sourceName: "Tech Created"
        });

        // Copy Surplus Excel to Clipboard
        const surplusRow = `${assetInfo.assetTag}\tAK\t${newTicket.id}\tAK`;
        GM_setClipboard(surplusRow, "text");
        GM_notification(
            "The excel row has been copied to your clipboard. Don't forget to paste it into the Surplus Excel!",
            "Surplus Processed Successfully"
        );
    }
}