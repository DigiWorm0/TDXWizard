import AccountsEndpoint from "./endpoints/AccountsEndpoint";
import ApplicationsEndpoint from "./endpoints/ApplicationsEndpoint";
import AttachmentsEndpoint from "./endpoints/AttachmentsEndpoint";
import AttributeEndpoint from "./endpoints/AttributeEndpoint";
import AuthEndpoint from "./endpoints/AuthEndpoint";
import TicketsEndpoint from "./endpoints/TicketsEndpoint";
import AssetEndpoint from "./endpoints/AssetEndpoint";
import TicketsTypesEndpoint from "./endpoints/TicketTypesEndpoint";

export default class TDXClient {
    // The base URL of the TDX API
    private readonly baseURL: string;

    // The bearer token for the TDX API
    private token: string | null = null;

    // Endpoints
    accounts: AccountsEndpoint;
    applications: ApplicationsEndpoint;
    attachments: AttachmentsEndpoint;
    attributes: AttributeEndpoint;
    auth: AuthEndpoint;
    tickets: TicketsEndpoint;
    assets: AssetEndpoint;
    ticketTypes: TicketsTypesEndpoint;

    /**
     * Creates a new TDX client
     * @param baseURL - The base URL of the TDX Web API. Example: "https://example.teamdynamix.com/TDWebApi/api/"
     */
    constructor(baseURL: string) {
        this.baseURL = baseURL;

        this.accounts = new AccountsEndpoint(this);
        this.applications = new ApplicationsEndpoint(this);
        this.attachments = new AttachmentsEndpoint(this);
        this.attributes = new AttributeEndpoint(this);
        this.auth = new AuthEndpoint(this);
        this.tickets = new TicketsEndpoint(this);
        this.assets = new AssetEndpoint(this);
        this.ticketTypes = new TicketsTypesEndpoint(this);
    }

    /**
     * Sets the bearer token for the TDX API
     * @param token - The bearer token
     */
    setToken(token: string) {
        this.token = token;
    }

    /**
     * Sends a raw request to the TDX API
     * @param endpoint - The endpoint to send the request to
     * @param params - The parameters to send with the request
     * @param method - The HTTP method to use (default: "GET")
     */
    async rawRequest(endpoint: string, params?: any, method?: string): Promise<Response> {
        // Create a request to the TDX API
        const response = await fetch(this.baseURL + endpoint, {
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            method: method || "GET",
            body: JSON.stringify(params),
        });

        // Check if the request was successful
        if (!response.ok)
            throw new Error(`Request failed with status ${response.status}`);

        // Return the response
        return response;
    }

    /**
     * Sends a JSON request to the TDX API
     * @param endpoint - The endpoint to send the request to
     * @param params - The parameters to send with the request
     * @param method - The HTTP method to use (default: "GET")
     */
    async jsonRequest<T>(endpoint: string, params?: any, method?: string): Promise<T> {
        // Send the request
        const response = await this.rawRequest(endpoint, params, method);

        // Parse the response
        return response.json();
    }
}