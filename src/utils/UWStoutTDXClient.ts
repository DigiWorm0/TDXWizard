import TDXClient from "../tdx-api/TDXClient";
import getSettings from "../hooks/settings/getSettings";

/**
 * A TDX client for the UW-Stout's TDX instance
 */
export default class UWStoutTDXClient extends TDXClient {
    constructor() {
        super("https://uwstout.teamdynamix.com/TDWebApi/api/");
        this.setToken(getSettings().authKey);
    }
}