export {};

declare global {
    interface Window {
        openWinReturn: (url: string, width: number, height: number, name: string) => void;
        openWorkMgmtSidePanel: (url: string) => void;
        WorkMgmt: any;

    }

    interface HTMLElement {
        addItem?: (title: string, id: string, jsonData: unknown, focusInput: boolean) => void;
    }
}