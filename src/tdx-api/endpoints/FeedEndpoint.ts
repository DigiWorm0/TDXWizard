import TDXEndpoint from "../TDXEndpoint";
import FeedItemUpdate from "../types/FeedItemUpdate";

/**
 * A class for interacting with the TDX Feed API
 */
export default class FeedEndpoint extends TDXEndpoint {
    getFeed(id: number) {
        return this.client.jsonRequest<FeedItemUpdate>(`feed/${id}`);
    }
}