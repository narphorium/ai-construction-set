import React, { MouseEvent } from 'react';
import { Span } from "../data";
export declare const ContentSpan: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    span: Span;
    selected?: boolean | React.Dispatch<React.SetStateAction<boolean>> | undefined;
    onSelected?: ((selected: boolean) => void) | undefined;
    onClick?: ((e: MouseEvent<HTMLDivElement>) => void) | undefined;
    key: any;
    ref?: React.Ref<HTMLSpanElement> | undefined;
}>;
