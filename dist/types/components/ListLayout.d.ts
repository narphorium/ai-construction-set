import React from 'react';
import { type List, type ListItem } from '../data';
import { type BlockProps, type SelectableProps, type CollapsibleProps } from './Base';
export interface ListLayoutProps extends BlockProps {
    block: List;
}
export declare const ListLayoutComponent: React.ForwardRefExoticComponent<ListLayoutProps & React.RefAttributes<HTMLDivElement>>;
export declare const ListLayout: import("styled-components").IStyledComponent<"web", {
    block: List;
    theme?: string | undefined;
    className?: string | string[] | undefined;
    variant?: string | undefined;
    ref?: React.Ref<HTMLDivElement> | undefined;
    key?: React.Key | null | undefined;
}> & React.ForwardRefExoticComponent<ListLayoutProps & React.RefAttributes<HTMLDivElement>>;
export interface ListItemProps extends SelectableProps, CollapsibleProps {
    block: ListItem;
}
export declare const ListItemComponent: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLDivElement>>;
export declare const ListLayoutItem: import("styled-components").IStyledComponent<"web", {
    block: ListItem;
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
}> & React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLDivElement>>;
