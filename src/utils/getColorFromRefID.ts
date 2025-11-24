const REF_ID_COLORS = [
    "#5e5e5e", // Gray
    "#bf3935", // Red
    "#298529", // Green
    "#8e6a00", // Yellow
    "#2e75b2", // Blue
];

const REF_ID_COLORS_DARK = [
    "#a1a1a1", // Gray
    "#bf3935", // Red
    "#3cb63c", // Green
    "#9c7500", // Yellow
    "#48a2f4", // Blue
];

/**
 * Chooses a generic profile color based on `User.ReferenceID`.
 * This mimics the behavior of the old TDX UI.
 * @param refID - The reference ID of the user.
 * @param isDarkMode - Whether dark mode is enabled.
 * @return A color string in hex format.
 */
export default function getColorFromRefID(refID: number, isDarkMode?: boolean): string {
    const colors = isDarkMode ? REF_ID_COLORS_DARK : REF_ID_COLORS;
    return colors[refID % colors.length];
}