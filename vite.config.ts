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
                icon: 'https://www.google.com/s2/favicons?sz=64&domain=uwstout.edu',
                namespace: 'digiworm0.github.io',
                match: [
                    'https://uwstout.teamdynamix.com/TDNext/*',
                    'https://selfservicehd.uwstout.edu/helpdesk/*',
                ],
                name: 'TDX Wizard',
                "run-at": "document-end"
            },
        }),
    ],
});
