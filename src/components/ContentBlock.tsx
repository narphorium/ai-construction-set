import React, { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Content } from '../data';
import { BlockFactoryContext, SelectedElementContext, SelectedStepContext } from '../hooks';
import { selectedVariants } from './theme';

interface ContentBlockProps {
    className?: string;
    content: Content;
    selected: boolean | Dispatch<SetStateAction<boolean>>;
    onSelected?: (selected: boolean) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    key: any;
}

export const ContentBlockComponent = ({className, content, selected, onSelected, onClick, key}: ContentBlockProps) => {

    const {step, setStep} = useContext(SelectedStepContext);
    const {element, setElement} = useContext(SelectedElementContext);
    const el = useRef<HTMLDivElement>(null);
    const {factory, setFactory} = useContext(BlockFactoryContext);

    useEffect(() => {
        if (onSelected !== undefined) {
            onSelected(selected as boolean);
        }
    }, [selected]);

    const getClasses = () => {
        const classes = content.getClassNames(step);
        if (className) {
            classes.push(className);
        }
        classes.push('aics-content-block');
        return classes.join(' ');
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // if (content.selection_index !== null) {
        //     setStep(content.selection_index);
        // }
        if (onClick !== undefined) {
            onClick(e);
        }
    };

    return <div ref={el} className={getClasses()} onClick={handleClick}>
         { content.children.map((child) => {
            return factory?.build(child, content);
         })}
    </div>;
};

const textColor = selectedVariants('mode', {
    default: { light: '#222', dark: '#292b2f' },
    selected: { light: '#222', dark: '#ffde98' },
});

const backgroundColor = selectedVariants('mode', {
    default: { light: 'white', dark: '#292b2f' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});

const borderColor = selectedVariants('mode', {
    default: { light: '#ccc', dark: '#595b60' },
    selected: { light: 'rgb(237, 211, 137)', dark: 'rgb(109 102 81)' },
});


export const ContentBlock = styled(ContentBlockComponent)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 4px 0;
  color: ${textColor};
  background-color: ${backgroundColor};
  border-color: ${borderColor};
`;