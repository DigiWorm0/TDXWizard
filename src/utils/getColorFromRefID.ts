/**
 * Chooses a generic profile color based on `User.ReferenceID`.
 * This mimics the behavior of the old TDX UI.
 * @param refID - The reference ID of the user.
 * @return A color string in hex format.
 */
export default function getColorFromRefID(refID: number): string {
    const colorArray = [
        "#5e5e5e", // Gray
        "#bf3935", // Red
        "#298529", // Green
        "#8e6a00", // Yellow
        "#2e75b2", // Blue
    ];
    return colorArray[refID % 5];
}