import React, { type Dispatch, type SetStateAction } from 'react';
import { type Stream } from '../data';
interface BlockStreamProps {
    className?: string | string[];
    stream: Stream;
    selected?: boolean | Dispatch<SetStateAction<boolean>>;
    onSelected?: (selected: boolean) => void;
    key: any;
}
export declare const BlockStreamComponent: React.ForwardRefExoticComponent<BlockStreamProps & React.RefAttributes<HTMLDivElement>>;
export declare const BlockStream: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    stream: Stream;
    selected?: boolean | React.Dispatch<React.SetStateAction<boolean>> | undefined;
    onSelected?: ((selected: boolean) => void) | undefined;
    key: any;
    ref?: React.Ref<HTMLDivElement> | undefined;
}>;
export {};
