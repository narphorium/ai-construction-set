import React, { type ComponentType, type ForwardRefExoticComponent, type PropsWithoutRef, type RefAttributes } from 'react';
import { type BaseProps } from './Base';
export declare const withTheme: <TProps extends BaseProps>(Component: React.ComponentType<TProps>, params: {
    lightTheme: any;
    darkTheme: any;
}) => React.ForwardRefExoticComponent<React.PropsWithoutRef<TProps> & React.RefAttributes<any>>;
