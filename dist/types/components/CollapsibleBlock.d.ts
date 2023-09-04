import React, { Dispatch, SetStateAction } from 'react';
interface CollapsibleBlockProps {
    children: string | JSX.Element | (JSX.Element | undefined)[];
    className?: string;
    title: string;
    collapsed: boolean | Dispatch<SetStateAction<boolean>>;
    onToggle?: (collapsed: boolean) => void;
    onTransitionEnd?: () => void;
}
export declare const CollapsibleBlock: ({ className, children, title, collapsed, onToggle, onTransitionEnd }: CollapsibleBlockProps) => React.JSX.Element;
export {};
