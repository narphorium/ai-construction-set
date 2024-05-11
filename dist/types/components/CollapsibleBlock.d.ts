import React from 'react';
import { type Collapsible } from '../data';
import { type CollapsibleProps, type SelectableProps } from './Base';
export interface CollapsibleBlockProps extends SelectableProps, CollapsibleProps {
    block: Collapsible;
}
export declare const CollapsibleBlockComponent: React.ForwardRefExoticComponent<CollapsibleBlockProps & React.RefAttributes<HTMLDivElement>>;
export declare const CollapsibleBlock: import("styled-components").IStyledComponent<"web", {
    block: Collapsible;
    selected?: boolean | undefined;
    setSelected?: ((selected: boolean) => void) | undefined;
    theme?: string | undefined;
    className?: string | string[] | undefined;
    variant?: string | undefined;
    collapsed?: boolean | undefined;
    setCollapsed?: ((collapsed: boolean) => void) | undefined;
    onTransitionEnd?: (() => void) | undefined;
    ref?: React.Ref<HTMLDivElement> | undefined;
    key?: React.Key | null | undefined;
}> & React.ForwardRefExoticComponent<CollapsibleBlockProps & React.RefAttributes<HTMLDivElement>>;
