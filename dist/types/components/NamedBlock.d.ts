import React, { Dispatch, SetStateAction } from 'react';
import { NamedContent } from '../data';
export declare const NamedBlock: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    content: NamedContent;
    collapsed: boolean | Dispatch<SetStateAction<boolean>>;
    selected?: boolean | React.Dispatch<React.SetStateAction<boolean>> | undefined;
    onToggle?: ((collapsed: boolean) => void) | undefined;
    onSelected?: ((selected: boolean) => void) | undefined;
    onTransitionEnd?: (() => void) | undefined;
    key: any;
    ref?: React.Ref<HTMLDivElement> | undefined;
}>;
export declare const BlockListItem: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    content: NamedContent;
    collapsed: boolean | Dispatch<SetStateAction<boolean>>;
    selected?: boolean | React.Dispatch<React.SetStateAction<boolean>> | undefined;
    onToggle?: ((collapsed: boolean) => void) | undefined;
    onSelected?: ((selected: boolean) => void) | undefined;
    onTransitionEnd?: (() => void) | undefined;
    key: any;
    ref?: React.Ref<HTMLDivElement> | undefined;
}>;
