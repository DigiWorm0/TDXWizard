import TDXEndpoint from "../TDXEndpoint";
import OrgApplication from "../types/OrgApplication";

/**
 * A class for interacting with the TDX Applications API
 */
export default class ApplicationsEndpoint extends TDXEndpoint {
    getApplications() {
        return this.client.jsonRequest<OrgApplication[]>("applications");
    }
}