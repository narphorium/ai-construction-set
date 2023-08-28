
import React, { Dispatch, ForwardedRef, SetStateAction, forwardRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { List } from '../data';
import { BlockFactoryContext } from '../hooks';
import { borderColor } from './theme';

interface BlockListProps {
    className?: string;
    list: List;
    selected: boolean | Dispatch<SetStateAction<boolean>>;
    onSelected?: (selected: boolean) => void;
    key: any;
}

export const BlockListComponent = forwardRef(({className, list, selected, onSelected, key}: BlockListProps, ref: ForwardedRef<HTMLDivElement>) => {

    const {factory, setFactory} = useContext(BlockFactoryContext);

    useEffect(() => {
        if (onSelected !== undefined) {
            onSelected(selected as boolean);
        }
    }, [selected]);

    const getClasses = () => {
        const classes = ['aics-block-list'];
        if (className != undefined) {
            classes.push(className);
        }
        if (selected) {
            classes.push('selected');
        }
        return classes.join(' ');
    };

    return <div ref={ref} className={getClasses()}>
        { list.items.map((item, index) => {
            return factory?.build(item, list);
        }) }
    </div>;
});

export const BlockList = styled(BlockListComponent)`
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 8px 0 0 0;
    border-color: ${borderColor};
`;