import React, { type MouseEvent } from 'react';
import { type Span } from '../data';
import { type SelectableProps } from './Base';
export interface ContentSpanProps extends SelectableProps {
    block: Span;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}
export declare const ContentSpanComponent: React.ForwardRefExoticComponent<ContentSpanProps & React.RefAttributes<HTMLSpanElement>>;
export declare const ContentSpan: import("styled-components").IStyledComponent<"web", {
    block: Span;
    onClick?: ((e: MouseEvent<HTMLDivElement>) => void) | undefined;
    selected?: boolean | undefined;
    setSelected?: ((selected: boolean) => void) | undefined;
    theme?: string | undefined;
    className?: string | string[] | undefined;
    variant?: string | undefined;
    ref?: React.Ref<HTMLSpanElement> | undefined;
    key?: React.Key | null | undefined;
}> & React.ForwardRefExoticComponent<ContentSpanProps & React.RefAttributes<HTMLSpanElement>>;
