import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import { Content } from '../data';
interface ContentBlockProps {
    className?: string | string[];
    content: Content;
    selected?: boolean | Dispatch<SetStateAction<boolean>>;
    onSelected?: (selected: boolean) => void;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    key: any;
}
export declare const ContentBlockComponent: React.ForwardRefExoticComponent<ContentBlockProps & React.RefAttributes<HTMLDivElement>>;
export declare const ContentBlock: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    content: Content;
    selected?: boolean | React.Dispatch<React.SetStateAction<boolean>> | undefined;
    onSelected?: ((selected: boolean) => void) | undefined;
    onClick?: ((e: MouseEvent<HTMLDivElement>) => void) | undefined;
    key: any;
    ref?: React.Ref<HTMLDivElement> | undefined;
}>;
export {};
