import TDXEndpoint from "../TDXEndpoint";
import User from "../types/User";

/**
 * A class for interacting with the TDX Auth API
 */
export default class AuthEndpoint extends TDXEndpoint {
    getUser() {
        return this.client.jsonRequest<User>("auth/user");
    }

    loginSSO() {
        return this.client.rawRequest("auth/loginsso");
    }
}