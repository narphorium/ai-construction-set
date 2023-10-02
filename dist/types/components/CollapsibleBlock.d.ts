import { type Dispatch, type SetStateAction } from 'react';
interface CollapsibleBlockProps {
    children: string | JSX.Element | Array<JSX.Element | undefined>;
    className?: string;
    title: string;
    collapsed?: boolean | Dispatch<SetStateAction<boolean>>;
    onToggle?: (collapsed: boolean) => void;
    onTransitionEnd?: () => void;
}
export declare const CollapsibleBlock: ({ className, children, title, collapsed, onToggle, onTransitionEnd }: CollapsibleBlockProps) => JSX.Element;
export {};
