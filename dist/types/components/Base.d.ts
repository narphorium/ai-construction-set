import { type Collapsible, type Base, type Selectable, type Pageable } from '../data';
export interface BaseProps {
    className?: string | string[];
    variant?: string;
}
export interface BlockProps extends BaseProps {
    block: Base;
    theme?: string;
}
export interface SelectableProps extends BlockProps {
    block: Selectable;
    selected?: boolean;
    setSelected?: (selected: boolean) => void;
}
export interface CollapsibleProps extends BlockProps {
    block: Collapsible;
    collapsed?: boolean;
    setCollapsed?: (collapsed: boolean) => void;
    onTransitionEnd?: () => void;
}
export interface PaginatedProps extends BlockProps {
    block: Pageable;
    level: number;
    page?: number;
    setPage?: (page: number) => void;
}
type classable = undefined | string | string[] | Set<string> | (() => string[]);
export declare const getClasses: (...args: classable[]) => string;
export {};
