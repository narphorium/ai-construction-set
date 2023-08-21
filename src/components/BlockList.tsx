
import React, { Dispatch, SetStateAction, useContext, useRef } from 'react';
import styled from 'styled-components';
import { List } from '../data';
import { BlockFactoryContext, SelectedStepContext } from '../hooks';
import { Variant, borderColor } from './theme';

interface BlockListProps {
    className?: string;
    list: List;
    variant: Variant;
    setVariant: Dispatch<SetStateAction<Variant>>;
    key: any;
}

export const BlockListComponent = ({className, list, variant, setVariant, key}: BlockListProps) => {

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
            return factory?.build(item, index, list);
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