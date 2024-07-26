import TDXEndpoint from "../TDXEndpoint";
import Guid from "../types/Guid";
import User from "../types/User";

/**
 * A class for interacting with the TDX People API
 */
export default class PeopleEndpoint extends TDXEndpoint {
    getPerson(uid: Guid) {
        return this.client.jsonRequest<User>(`people/${uid}`);
    }
}