import React, { type ReactElement } from 'react';
export declare class NestedPaginationState {
    pages: number[];
    numPages: number[];
    static copy(state: NestedPaginationState): NestedPaginationState;
    getPage(level: number): number;
    getNumPages(level: number): number;
}
export type NestedPaginationAction = {
    type: 'register';
    numPages: number;
    level: number;
} | {
    type: 'start';
    level: number;
} | {
    type: 'end';
    level: number;
} | {
    type: 'previous';
    level: number;
} | {
    type: 'next';
    level: number;
} | {
    type: 'goto';
    page: number;
    level: number;
};
export declare const NestedPaginationReducer: (state: NestedPaginationState, action: NestedPaginationAction) => NestedPaginationState;
export declare const NestedPaginationContext: React.Context<NestedPaginationState | null>;
export declare const NestedPaginationDispatchContext: React.Context<React.Dispatch<NestedPaginationAction> | null>;
interface NestedPaginationProviderProps {
    pages: number[];
    numPages: number[];
    onChange?: (state: NestedPaginationState) => void;
    children: React.ReactNode;
}
export declare const NestedPaginationProvider: ({ pages, numPages, onChange, children }: NestedPaginationProviderProps) => ReactElement<any, any>;
export {};
