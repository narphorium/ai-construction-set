import React, { type MouseEvent } from 'react';
import { type Content } from '../data';
import { type SelectableProps } from './Base';
export interface ContentBlockProps extends SelectableProps {
    block: Content;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}
export declare const ContentBlockComponent: React.ForwardRefExoticComponent<ContentBlockProps & React.RefAttributes<HTMLDivElement>>;
export declare const ContentBlock: import("styled-components").IStyledComponent<"web", {
    block: Content;
    onClick?: ((e: MouseEvent<HTMLDivElement>) => void) | undefined;
    selected?: boolean | undefined;
    setSelected?: ((selected: boolean) => void) | undefined;
    theme?: string | undefined;
    className?: string | string[] | undefined;
    variant?: string | undefined;
    ref?: React.Ref<HTMLDivElement> | undefined;
    key?: React.Key | null | undefined;
}> & React.ForwardRefExoticComponent<ContentBlockProps & React.RefAttributes<HTMLDivElement>>;
