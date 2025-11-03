import Settings from "../types/Settings";

/**
 * Migrates deprecated settings to their new equivalents.
 * @param settings - The settings object to migrate.
 * @returns The migrated settings object.
 */
export default function migrateDeprecatedSettings(settings: Settings): Settings {

    // Open Links In New Window >> Open Links In
    if (settings.openLinksInNewWindow !== undefined) {
        console.warn("[TDXWizard] Migrating deprecated setting: openLinksInNewWindow");
        settings.openLinksIn = settings.openLinksInNewWindow ? "newWindow" : "newTDXTab";
        delete settings.openLinksInNewWindow;
    }

    return {...settings};
}