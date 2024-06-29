export default function waitFor(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}