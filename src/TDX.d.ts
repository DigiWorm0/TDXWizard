export {};

declare global {
    interface Window {
        openWinHref: (event: any, width: number, height: number, name: string) => void;
    }
}