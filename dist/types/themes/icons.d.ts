import { type DefaultTheme } from 'styled-components';
export declare const getIcon: (theme: DefaultTheme, name: string, size: number) => string | undefined;
type ThemeArgument = string | ((props: any) => string);
type SizeArgument = number | ((props: any) => number);
export declare const themedIcon: (icon: ThemeArgument, size: SizeArgument, color: ThemeArgument) => (props: any) => string;
export {};
