import React, { Dispatch, SetStateAction } from 'react';
import { List } from '../data';
interface BlockListProps {
    className?: string | string[];
    list: List;
    selected: boolean | Dispatch<SetStateAction<boolean>>;
    onSelected?: (selected: boolean) => void;
    key: any;
}
export declare const BlockListComponent: React.ForwardRefExoticComponent<BlockListProps & React.RefAttributes<HTMLDivElement>>;
export declare const BlockList: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    list: List;
    selected: boolean | Dispatch<SetStateAction<boolean>>;
    onSelected?: ((selected: boolean) => void) | undefined;
    key: any;
    ref?: React.Ref<HTMLDivElement> | undefined;
}>;
export {};
