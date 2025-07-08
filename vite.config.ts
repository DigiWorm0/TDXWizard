import {defineConfig} from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: false,
        hmr: false
    },
    build: {
        minify: "terser"
    },
    plugins: [
        monkey({
            entry: 'src/main.ts',
            userscript: {
                icon: 'https://i.imgur.com/YqFAJaY.png',
                namespace: 'digiworm0.github.io',
                match: [
                    // Matches all TDX instances (both our own and others)
                    // Match all TDX endpoints (TDNext, TDWorkManagement, TDWebAPI, etc.)
                    'https://*.teamdynamix.com/*'
                ],
                downloadURL: 'https://digiworm0.github.io/TDXWizard/tdx-wizard.user.js',
                name: 'TDX Wizard',
                "run-at": "document-end"
            }
        }),
    ],
});
