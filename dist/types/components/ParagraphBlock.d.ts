import React, { type MouseEvent } from 'react';
import { type Paragraph } from '../data';
import { type SelectableProps } from './Base';
export interface ParagraphBlockProps extends SelectableProps {
    block: Paragraph;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}
export declare const ParagraphBlock: import("styled-components").IStyledComponent<"web", {
    block: Paragraph;
    onClick?: ((e: MouseEvent<HTMLDivElement>) => void) | undefined;
    selected?: boolean | undefined;
    setSelected?: ((selected: boolean) => void) | undefined;
    theme?: string | undefined;
    className?: string | string[] | undefined;
    variant?: string | undefined;
    ref?: React.Ref<HTMLDivElement> | undefined;
    key?: React.Key | null | undefined;
}> & React.ForwardRefExoticComponent<ParagraphBlockProps & React.RefAttributes<HTMLDivElement>>;
