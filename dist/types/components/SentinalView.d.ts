import React from 'react';
import { type Selectable } from '../data';
import { type SelectableProps } from './Base';
export interface SentinalViewProps extends SelectableProps {
    block: Selectable;
}
export declare const SentinalView: React.ForwardRefExoticComponent<SentinalViewProps & React.RefAttributes<HTMLDivElement>>;
