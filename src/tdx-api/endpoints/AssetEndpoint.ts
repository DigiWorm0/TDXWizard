import TDXEndpoint from "../TDXEndpoint";
import Asset from "../types/Asset";
import AssetSearch from "../types/AssetSearch";

/**
 * A class for interacting with the TDX Asset API
 */
export default class AssetEndpoint extends TDXEndpoint {
    getAsset(appID: number, assetID: number) {
        return this.client.jsonRequest<Asset>(`${appID}/assets/${assetID}`);
    }

    addAssetToTicket(appID: number, assetID: number, ticketID: number) {
        return this.client.rawRequest(`${appID}/assets/${assetID}/tickets/${ticketID}`, undefined, "POST");
    }

    removeAssetFromTicket(appID: number, assetID: number, ticketID: number) {
        return this.client.rawRequest(`${appID}/assets/${assetID}/tickets/${ticketID}`, undefined, "DELETE");
    }

    searchAssets(appID: number, options: AssetSearch) {
        return this.client.jsonRequest<Asset[]>(`${appID}/assets/search`, options, "POST");
    }

    // getAssetFeed(appID: number, assetID: number) {
    //     return this.client.jsonRequest<any>(`api/${appID}/assets/${assetID}/feed`);
    // }
}