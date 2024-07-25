import {createRoot} from 'react-dom/client';
import {ReactNode} from "react";

/**
 * Adds a React component to the DOM
 * @param element - The element to add the component to
 * @param component - The React component function to add
 */
export default function addComponentToDOM(element: Element, component: ReactNode) {
    // Create a container element to render the component into
    const container = document.createElement("div");
    container.style.display = "inline-block";
    element.appendChild(container);

    // Render the component
    const root = createRoot(container);
    root.render(component);
}