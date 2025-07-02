import TDXEndpoint from "../TDXEndpoint";
import GroupSearch from "../types/GroupSearch";
import Group from "../types/Group";

/**
 * A class for interacting with the TDX Groups API
 */
export default class GroupsEndpoint extends TDXEndpoint {
    search(query: GroupSearch) {
        return this.client.jsonRequest<Group[]>('groups/bettersearch', query, "POST");
    }
}