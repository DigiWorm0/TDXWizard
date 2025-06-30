export {};

declare global {
    interface Window {
        openWinReturn: (url: string, width: number, height: number, name: string) => void;
        openWorkMgmtSidePanel: (url: string) => void;
        WorkMgmt: any;

    }
}