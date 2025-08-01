import TDXEndpoint from "../TDXEndpoint";
import Guid from "../types/Guid";
import User from "../types/User";
import UserSearch from "../types/UserSearch";

/**
 * A class for interacting with the TDX People API
 */
export default class PeopleEndpoint extends TDXEndpoint {
    getPerson(uid: Guid) {
        return this.client.jsonRequest<User>(`people/${uid}`);
    }

    lookup(searchText: string, maxResults: number = 50) {
        return this.client.jsonRequest<User[]>(`people/lookup?searchText=${encodeURIComponent(searchText)}&maxResults=${maxResults}`);
    }

    search(query: UserSearch) {
        return this.client.jsonRequest<User[]>('people/search', query, "POST");
    }
}