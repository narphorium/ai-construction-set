import { type DefaultTheme } from 'styled-components';
export type Shade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '980';
export type ColorPalette = Record<string, Record<Shade, string>>;
export declare const getColor: (theme: DefaultTheme, key: string) => string | undefined;
export declare const getColors: (theme: DefaultTheme, name: string) => Record<string, string>;
export declare const themedVariant: (name: string, variant?: string | null, selected?: boolean | null) => (props: any) => any;
export declare const extendTheme: (base: DefaultTheme, extension: DefaultTheme) => DefaultTheme;
