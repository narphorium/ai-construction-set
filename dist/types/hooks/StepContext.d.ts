/// <reference types="react" />
interface SelectedElement {
    element: HTMLElement | undefined;
    setElement: (element: HTMLElement) => void;
}
export declare const SelectedElementContext: import("react").Context<SelectedElement>;
interface ScrollFlag {
    flag: boolean;
    toggle: () => void;
}
export declare const ScrollFlagContext: import("react").Context<ScrollFlag>;
export {};
