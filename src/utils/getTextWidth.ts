// Cache for the canvas context to avoid creating it multiple times
let context: CanvasRenderingContext2D | null = null;

/**
 * Calculates the width of a given text string when rendered in a specific font.
 * @param text - The text string to measure.
 * @param font - The font style to use for measurement (default is "16px Arial").
 * @return The width of the text in pixels.
 */
export default function getTextWidth(text: string, font: string = "16px Arial"): number {
    // Create a canvas context if it doesn't exist
    if (context === null) {
        const canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
    }

    // Ensure the context is valid
    if (!context)
        throw new Error("Failed to get canvas context");

    // Set the font and measure the text
    context.font = font;
    return context.measureText(text).width;
}