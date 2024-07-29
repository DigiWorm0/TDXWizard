import {createRoot} from 'react-dom/client';
import {ReactNode} from "react";

export interface AddComponentOptions {
    elementType?: string;
}

/**
 * Adds a React component to the DOM
 * @param element - The element to add the component to
 * @param component - The React component function to add
 */
export default function addComponentToDOM(element: Element, component: ReactNode, options?: AddComponentOptions) {
    // Create a container element to render the component into
    const container = document.createElement(options?.elementType || "div");
    container.style.display = "inline-block";
    element.appendChild(container);

    // Render the component
    const root = createRoot(container);
    root.render(component);
}