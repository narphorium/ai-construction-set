import { createContext } from "react";

export const SelectedStepContext = createContext({
    step: 1,
    setStep: (step: number) => {}
});

interface SelectedElement {
    element: HTMLElement | undefined;
    setElement: (element: HTMLElement) => void;
}

export const SelectedElementContext = createContext<SelectedElement>({
    element: undefined,
    setElement: (element: HTMLElement) => {}
});

interface ScrollFlag {
    flag: boolean;
    toggle: () => void;
}

export const ScrollFlagContext = createContext<ScrollFlag>({
    flag: false,
    toggle: () => {}
});