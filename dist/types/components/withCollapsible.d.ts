import React, { type ComponentType, type Dispatch, type SetStateAction } from 'react';
interface Base {
    collapsed?: boolean | Dispatch<SetStateAction<boolean>>;
    toggleCollapsed?: (selected: boolean) => void;
}
export declare const withCollapsible: <TProps extends Base>(Component: React.ComponentType<TProps>, params: {
    collapsed: boolean;
}) => (props: TProps) => JSX.Element;
export {};
