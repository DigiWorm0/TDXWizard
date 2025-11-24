export default function getDarkMode() {
    const bodyStyles = window.getComputedStyle(document.body);
    const colorScheme = bodyStyles.getPropertyValue("color-scheme").trim();
    return colorScheme === "dark";
}