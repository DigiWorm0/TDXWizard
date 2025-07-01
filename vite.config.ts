import {defineConfig} from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: false,
        hmr: false
    },
    plugins: [
        monkey({
            entry: 'src/main.ts',
            userscript: {
                icon: 'https://i.imgur.com/YqFAJaY.png',
                namespace: 'digiworm0.github.io',
                match: [
                    'https://uwstout.teamdynamix.com/*'
                ],
                downloadURL: 'https://digiworm0.github.io/TDXWizard/tdx-wizard.user.js',
                name: 'TDX Wizard',
                "run-at": "document-end"
            },
        }),
    ],
});
