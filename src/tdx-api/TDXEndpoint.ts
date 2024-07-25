import TDXClient from "./TDXClient";

/**
 * A base class for TDX API endpoints
 * @internal
 */
export default class TDXEndpoint {
    protected client: TDXClient;

    /**
     * Creates a new TDX endpoint
     * @param client - The TDX client
     */
    constructor(client: TDXClient) {
        this.client = client;
    }
}