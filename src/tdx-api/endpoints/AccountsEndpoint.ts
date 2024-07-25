import Account from "../types/Account";
import AccountSearch from "../types/AccountSearch";
import TDXEndpoint from "../TDXEndpoint";

/**
 * A class for interacting with the TDX Accounts API
 */
export default class AccountsEndpoint extends TDXEndpoint {
    getAccounts() {
        return this.client.jsonRequest<Account>("accounts");
    }

    getAccount(id: number) {
        return this.client.jsonRequest<Account>(`accounts/${id}`);
    }

    searchAccounts(searchQuery: AccountSearch) {
        return this.client.jsonRequest<Account[]>("accounts/search", searchQuery);
    }
}