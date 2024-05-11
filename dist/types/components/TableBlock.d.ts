import React, { type MouseEvent } from 'react';
import { type Table } from '../data';
import { type SelectableProps } from './Base';
export interface TableBlockProps extends SelectableProps {
    block: Table;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}
export declare const TableBlockComponent: React.ForwardRefExoticComponent<TableBlockProps & React.RefAttributes<HTMLDivElement>>;
export declare const TableBlock: import("styled-components").IStyledComponent<"web", {
    block: Table;
    onClick?: ((e: MouseEvent<HTMLDivElement>) => void) | undefined;
    selected?: boolean | undefined;
    setSelected?: ((selected: boolean) => void) | undefined;
    theme?: string | undefined;
    className?: string | string[] | undefined;
    variant?: string | undefined;
    ref?: React.Ref<HTMLDivElement> | undefined;
    key?: React.Key | null | undefined;
}> & React.ForwardRefExoticComponent<TableBlockProps & React.RefAttributes<HTMLDivElement>>;
