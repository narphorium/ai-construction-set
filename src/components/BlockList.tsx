
import React, { Dispatch, SetStateAction, useContext, useRef } from 'react';
import styled from 'styled-components';
import { List } from '../data';
import { BlockFactoryContext, SelectedStepContext } from '../hooks';
import { borderColor } from './theme';

interface BlockListProps {
    className?: string;
    list: List;
    selected: boolean | Dispatch<SetStateAction<boolean>>;
    onSelected?: (selected: boolean) => void;
    key: any;
}

export const BlockListComponent = ({className, list, selected, onSelected, key}: BlockListProps) => {

    const {step, setStep} = useContext(SelectedStepContext);
    const {factory, setFactory} = useContext(BlockFactoryContext);

    const el = useRef<HTMLDivElement>(null);

    const getClasses = () => {
        const classes = list.getClassNames(step);
        if (className != undefined) {
            classes.push(className);
        }
        classes.push('aics-block-list');
        return classes.join(' ');
    };

    return <div className={getClasses()}>
        { list.items.map((item, index) => {
            return factory?.build(item, list);
        }) }
    </div>;
}

export const BlockList = styled(BlockListComponent)`
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 8px 0 0 0;
    border-color: ${borderColor};
`;