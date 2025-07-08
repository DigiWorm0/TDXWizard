import TDXClient from "./TDXClient";
import getSettings from "../utils/getSettings";

/**
 * A TDX client for the UW-Stout's TDX instance.
 * Automatically uses the current page URL and sets the auth key from settings or provided argument.
 */
export default class LocalTDXClient extends TDXClient {
    constructor(authKey?: string) {
        // Use the current page URL
        super("/TDWebApi/api/");

        // Set the auth key from settings or provided argument
        this.setToken(authKey ?? getSettings().authKey);
    }
}