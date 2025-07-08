import AccountsEndpoint from "./endpoints/AccountsEndpoint";
import ApplicationsEndpoint from "./endpoints/ApplicationsEndpoint";
import AttachmentsEndpoint from "./endpoints/AttachmentsEndpoint";
import AttributeEndpoint from "./endpoints/AttributeEndpoint";
import AuthEndpoint from "./endpoints/AuthEndpoint";
import TicketsEndpoint from "./endpoints/TicketsEndpoint";
import AssetEndpoint from "./endpoints/AssetEndpoint";
import TicketsTypesEndpoint from "./endpoints/TicketTypesEndpoint";
import FeedEndpoint from "./endpoints/FeedEndpoint";
import PeopleEndpoint from "./endpoints/PeopleEndpoint";
import HTTPResponseError from "../utils/HTTPResponseError";
import TicketTasksEndpoint from "./endpoints/TicketTasksEndpoint";
import SearchEndpoint from "./endpoints/SearchEndpoint";
import GroupsEndpoint from "./endpoints/GroupsEndpoint";

export default class TDXClient {
    // The base URL of the TDX API
    private readonly baseURL: string;

    // The bearer token for the TDX API
    private token: string | null = null;

    // Endpoints
    accounts = new AccountsEndpoint(this);
    applications = new ApplicationsEndpoint(this);
    attachments = new AttachmentsEndpoint(this);
    attributes = new AttributeEndpoint(this);
    auth = new AuthEndpoint(this);
    tickets = new TicketsEndpoint(this);
    assets = new AssetEndpoint(this);
    ticketTypes = new TicketsTypesEndpoint(this);
    ticketTasks = new TicketTasksEndpoint(this);
    feed = new FeedEndpoint(this);
    people = new PeopleEndpoint(this);
    search = new SearchEndpoint(this);
    groups = new GroupsEndpoint(this);

    // TODO: Add missing endpoints
    // Not all endpoints are implemented yet, currently endpoints and types are implemented on an as-needed basis.

    /**
     * Creates a new TDX client.
     * You can use `LocalTDXClient` if you're currently at the URL of a TeamDynamix instance.
     * @param baseURL - The base URL of the TDX Web API. Example: "https://example.teamdynamix.com/TDWebApi/api/"
     */
    constructor(baseURL: string) {
        this.baseURL = baseURL;
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
            throw new HTTPResponseError(response);

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