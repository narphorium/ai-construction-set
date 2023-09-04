import React, { Dispatch, SetStateAction } from 'react';
import { Selectable } from '../data';
interface SentinalViewProps {
    sentinal: Selectable;
    selected?: boolean | Dispatch<SetStateAction<boolean>>;
    onSelected?: (selected: boolean) => void;
    key: any;
}
export declare const SentinalView: React.ForwardRefExoticComponent<SentinalViewProps & React.RefAttributes<HTMLDivElement>>;
export {};
