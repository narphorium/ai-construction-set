import React from 'react';
import { Stream } from '../data';
interface BlockStreamProps {
    className?: string | string[];
    stream: Stream;
}
export declare const BlockStreamComponent: React.ForwardRefExoticComponent<BlockStreamProps & React.RefAttributes<HTMLDivElement>>;
export declare const BlockStream: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    stream: Stream;
    ref?: React.Ref<HTMLDivElement> | undefined;
    key?: React.Key | null | undefined;
}>;
export {};
