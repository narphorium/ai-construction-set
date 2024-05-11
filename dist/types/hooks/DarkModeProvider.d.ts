/// <reference types="react" />
interface DarkModeProps {
    darkMode: boolean | undefined;
    setDarkMode: (mode: boolean) => void;
}
export declare const DarkModeContext: import("react").Context<DarkModeProps>;
export {};
