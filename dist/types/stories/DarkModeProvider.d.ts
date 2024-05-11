/// <reference types="react" />
interface DarkModeProps {
    mode: string | undefined;
    setMode: (mode: string) => void;
}
export declare const DarkModeContext: import("react").Context<DarkModeProps>;
export {};
