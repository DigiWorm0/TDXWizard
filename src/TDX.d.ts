export {};

declare global {
    interface Window {
        openWinHref: (event: any, width?: number, height?: number, name?: string) => void;
        openWinReturn: (url: string, width?: number, height?: number, name?: string) => void;
        openInNewBrowserTab: (url: string) => boolean;
    }
}