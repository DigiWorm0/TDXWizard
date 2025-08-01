import PageScript from "./PageScript";
import getSettings, {setSettings} from "../utils/getSettings";

const URL_PREFIX_REGEX = /\/TDWebApi\/api\/auth\/loginsso/g;

export default class AuthPage implements PageScript {

    canRun() {
        return URL_PREFIX_REGEX.test(window.location.pathname);
    }

    run() {
        AuthPage.saveLogin();
    }

    static saveLogin() {
        const settings = getSettings();

        setSettings({
            ...settings,
            authKey: document.body.innerText || settings.authKey,
        });

        window.close();
    }
}