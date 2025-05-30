export default function openWindow(href: string) {
    // TODO: Fallback to tab
    window.open(href, "_blank", "width=800,height=600");
}