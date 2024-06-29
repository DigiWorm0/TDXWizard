export default interface PageScript {
    canRun: () => boolean;
    run: () => void;
}