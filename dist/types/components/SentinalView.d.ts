import React, { type Dispatch, type SetStateAction } from 'react';
import { type Selectable } from '../data';
interface SentinalViewProps {
    sentinal: Selectable;
    selected?: boolean | Dispatch<SetStateAction<boolean>>;
    onSelected?: (selected: boolean) => void;
    key: any;
}
export declare const SentinalView: React.ForwardRefExoticComponent<SentinalViewProps & React.RefAttributes<HTMLDivElement>>;
export {};
