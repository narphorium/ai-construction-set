import { type ViewUpdate } from '@codemirror/view';
import React, { type MouseEvent } from 'react';
import { type Code } from '../data/Code';
import { type SelectableProps } from './Base';
export interface CodeBlockProps extends SelectableProps {
    block: Code;
    extensions?: any[];
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    onChange?: (value: string, viewUpdate: ViewUpdate) => void;
    editable: boolean;
}
export declare const CodeBlock: import("styled-components").IStyledComponent<"web", {
    block: Code;
    extensions?: any[] | undefined;
    onClick?: ((e: MouseEvent<HTMLDivElement>) => void) | undefined;
    onChange?: ((value: string, viewUpdate: ViewUpdate) => void) | undefined;
    editable: boolean;
    selected?: boolean | undefined;
    setSelected?: ((selected: boolean) => void) | undefined;
    theme?: string | undefined;
    className?: string | string[] | undefined;
    variant?: string | undefined;
    ref?: React.Ref<HTMLDivElement> | undefined;
    key?: React.Key | null | undefined;
}> & React.ForwardRefExoticComponent<CodeBlockProps & React.RefAttributes<HTMLDivElement>>;
