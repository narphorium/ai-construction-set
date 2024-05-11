import React, { type ComponentType, type ForwardRefExoticComponent, type PropsWithoutRef, type RefAttributes } from 'react';
import { type BlockProps } from './Base';
export interface BlockRef {
    scrollIntoView: (args: any) => void;
}
export declare const withRef: <TProps extends BlockProps>(Component: React.ComponentType<TProps>) => React.ForwardRefExoticComponent<React.PropsWithoutRef<TProps> & React.RefAttributes<any>>;
