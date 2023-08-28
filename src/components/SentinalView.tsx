import React, { Dispatch, ForwardedRef, SetStateAction, forwardRef, useEffect } from 'react';
import { Selectable } from '../data';

interface SentinalViewProps {
  sentinal: Selectable;
  selected?: boolean | Dispatch<SetStateAction<boolean>>;
  onSelected?: (selected: boolean) => void;
  key: any;
}

export const SentinalView = forwardRef(({sentinal, selected, onSelected, key}: SentinalViewProps, ref: ForwardedRef<HTMLDivElement>) => {

    useEffect(() => {
        if (onSelected !== undefined) {
            onSelected(selected as boolean);
        }
    }, [selected]);

    return <div ref={ref} className="aics-sentinal"></div>;
});