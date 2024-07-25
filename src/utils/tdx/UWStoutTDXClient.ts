import TDXClient from "../../tdx-api/TDXClient";
import getSettings from "../getSettings";

/**
 * A TDX client for the UW-Stout's TDX instance
 */
export default class UWStoutTDXClient extends TDXClient {
    constructor(authKey?: string) {
        super("https://uwstout.teamdynamix.com/TDWebApi/api/");
        this.setToken(authKey ?? getSettings().authKey);
    }
}