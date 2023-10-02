import React, { type ComponentType, type Dispatch, type SetStateAction } from 'react';
interface Base {
    selected?: boolean | Dispatch<SetStateAction<boolean>>;
    onSelected?: (selected: boolean) => void;
}
export declare const withRef: <TProps extends Base>(Component: React.ComponentType<TProps>) => (props: TProps) => JSX.Element;
export {};
