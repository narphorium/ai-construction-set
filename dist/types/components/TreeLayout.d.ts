import React from 'react';
import { Tree } from '../data';
import { type PaginatedProps } from './Base';
export interface TreeLayoutProps extends PaginatedProps {
    block: Tree;
}
export declare const TreeLayoutComponent: React.ForwardRefExoticComponent<TreeLayoutProps & React.RefAttributes<HTMLDivElement>>;
export declare const TreeLayout: import("styled-components").IStyledComponent<"web", {
    block: Tree;
    level: number;
    page?: number | undefined;
    setPage?: ((page: number) => void) | undefined;
    theme?: string | undefined;
    className?: string | string[] | undefined;
    variant?: string | undefined;
    ref?: React.Ref<HTMLDivElement> | undefined;
    key?: React.Key | null | undefined;
}> & React.ForwardRefExoticComponent<TreeLayoutProps & React.RefAttributes<HTMLDivElement>>;
