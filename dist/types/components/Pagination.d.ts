/// <reference types="react" />
import { type BaseProps } from './Base';
export interface PaginationProps extends BaseProps {
    level: number;
    page?: number;
    setPage?: (page: number) => void;
    numPages: number;
    showEnds?: boolean;
}
export declare const PaginationComponent: ({ className, page, numPages, showEnds, setPage }: PaginationProps) => JSX.Element;
export declare const Pagination: import("styled-components").IStyledComponent<"web", {
    level: number;
    page?: number | undefined;
    setPage?: ((page: number) => void) | undefined;
    numPages: number;
    showEnds?: boolean | undefined;
    className?: string | string[] | undefined;
    variant?: string | undefined;
}> & (({ className, page, numPages, showEnds, setPage }: PaginationProps) => JSX.Element);
