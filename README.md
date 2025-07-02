# TDX Wizard 🪄

This is a UserScript that enhances the TeamDynamix experience by adding user-friendly features and improvements.
This extension's primary goal is to improve the user experience of IT technicians utilizing TeamDynamix for managing
tickets and assets/CIs.

*(This project is not affiliated with TeamDynamix)*

![Settings Window](https://i.imgur.com/Ov6aEJM.png)

## Features

- 💬 [Redesigned ticket feed](https://i.imgur.com/OYxjGBz.png)
    - Display comments/replies in chronological order
    - Shrink system messages and focus on user comments
    - Customizable colors
- 🔍 [Enhanced search](https://i.imgur.com/jDyqhhV.png)
    - Autocomplete assets, tickets, and users
    - Search suggestions
    - Re-open recent searches
- 🎨 UI Improvements
    - Striped table rows
    - Dense layout
- 🧩 Make your own custom email templates
- 👋 Quick-select your own user
- 📦 [Bulk asset update tool](https://i.imgur.com/WkF8x2y.png)
- ⏪ Bring back opening links in a new window (Like legacy TDX)
- 🏷️ Automatically suggest ticket type, assignments, or assets
- 🖨️ Better ticket printing
    - Replace "Print View" with quick "Print"
    - Select default printing options
- ⚙️ [Customizable settings](https://i.imgur.com/7bGCk2i.png)
    - Change colors, enable/disable features, and more

## Installation

1. Install a UserScript extension in your
   browser ([TamperMonkey](https://www.tampermonkey.net/)/[ViolentMonkey](https://violentmonkey.github.io/))
    - If you're using a chromium-based browser (Chrome/Edge/Opera), you'll need to follow the extension's instructions
      to enable "developer mode"
2. Go
   to [https://digiworm0.github.io/TDXWizard/tdx-wizard.user.js](https://digiworm0.github.io/TDXWizard/tdx-wizard.user.js)
3. Change `@match` in the script header to match your TeamDynamix subdomain (e.g.
   `https://yourcompany.teamdynamix.com/*`)
    - By default, this is set to UW-Stout's TeamDynamix URL
5. Open/Refresh your TeamDynamix page

If installed correctly, you should see a wizard icon in the top right corner next to your profile. You can click this
icon to open the settings menu.

> This project is designed and tested on [UW-Stout](https://uwstout.edu/)'s TeamDynamix instance.
> It *should* work on any TeamDynamix instance, but some features may not be available or may not work as expected.
> Feel free to open an [issue](https://github.com/Digiworm0/TDXWizard/issues) if you find any bugs or have suggestions
> for improvements. You're always welcome to fork this project and add features curated to your own TeamDynamix
> instance.

### Privacy/Permissions

This script does use your TDX instance's web API (TDWebAPI) to interact with TeamDynamix, but it does not collect or
send any data to external servers.

The script, in its entirety, is open-source w/ CI builds performed automatically by GitHub Actions on every commit.
You're welcome to explore this repository to see how the script works and what data it accesses.

By default, auto-updates are enabled based on the latest CI release.
This can be disabled by removing the `@updateURL` tag in the script's header.

The following permissions are required for the script to function properly:

- `GM_addStyle`: Adds custom CSS styles to the page
- `GM_getValue`/`GM_setValue`: Store and retrieve user settings.
- `unsafeWindow`: Patch TeamDynamix's tab/window management system to override default behavior
    - Primarily used for "Open Links in New Window" feature

This software is provided "as is", without warranty of any kind, express or implied

## Building

> This section is for developers who want to contribute to the project or build the script themselves.
> Instructions for installing the script are under the [Installation](#installation) section.

The latest production build is available
at [https://digiworm0.github.io/TDXWizard/tdx-wizard.user.js](https://digiworm0.github.io/TDXWizard/tdx-wizard.user.js)
w/ nightly builds in the [GitHub Actions](https://github.com/DigiWorm0/TDXWizard/actions) tab.
If you'd like to build the script yourself, follow these steps:

1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone this repository and navigate to the project directory
    - `git clone https://github.com/DigiWorm0/TDXWizard.git`
    - `cd TDXWizard`
3. Run `yarn install` to install dependencies
    - If you don't have `yarn` installed, you can install it via `npm install -g yarn`
    - Alternatively, you can use `npm install` to install dependencies, but `yarn` is recommended for this project
4. Run `yarn run dev` to start the development server (optional, for testing changes)
    - A link will appear in the console to install the dev script in your browser
    - This will automatically rebuild the script when changes are made (you'll need to refresh the page to see changes)
5. Run `yarn build` to build the production script
    - The script will be saved to `dist/tdx-wizard.user.js`

<hr />

TDX Wizard is not affiliated with TeamDynamix,
and the content contained therein is not endorsed or otherwise sponsored by TeamDynamix.