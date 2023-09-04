import React, { MouseEvent } from 'react';
import { Section } from "../data";
export declare const ContentSection: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    section: Section;
    selected?: boolean | React.Dispatch<React.SetStateAction<boolean>> | undefined;
    onSelected?: ((selected: boolean) => void) | undefined;
    onClick?: ((e: MouseEvent<HTMLDivElement>) => void) | undefined;
    key: any;
    ref?: React.Ref<HTMLDivElement> | undefined;
}>;
