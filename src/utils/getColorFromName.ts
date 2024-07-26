export default function getColorFromName(name: string): string {
    const firstChar = name[0].toUpperCase();
    const charCode = firstChar.charCodeAt(0);
    const index = (charCode - 65) / 25; // 0 ~ 1
    const hue = (index * -360 - 150) % 360;
    return `hsl(${hue}, 40%, 40%)`;
}