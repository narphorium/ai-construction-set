
import React, { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { NamedContent } from '../data';
import { BlockFactoryContext, SelectedElementContext, SelectedStepContext } from '../hooks';
import { CollapsibleBlock, } from './CollapsibleBlock';
import { selectedVariants } from './theme';

interface NamedBlockProps {
    className?: string | string[],
    content: NamedContent, 
    collapsed: boolean | Dispatch<SetStateAction<boolean>>,
    selected: boolean | Dispatch<SetStateAction<boolean>>,
    onToggle?: (collapsed: boolean) => void,
    onSelected?: (selected: boolean) => void;
    key: any
}

const NamedBlockComponent = ({className, content, collapsed, selected, onToggle, onSelected, key}: NamedBlockProps) => {

    const {step, setStep} = useContext(SelectedStepContext);
    const {element, setElement} = useContext(SelectedElementContext);
    const el = useRef<HTMLDivElement>(null);
    const {factory, setFactory} = useContext(BlockFactoryContext);

    // useEffect(() => {
    //     if (step === content.selection_index) {
    //         setVariant('selected');
    //       if (el.current !== null) {
    //           setElement(el.current);
    //       }
    //     } else {  
    //         setVariant('default');
    //     }
    //     setCollapsed(!content.containsSelected(step));
    // }, [step]);

    useEffect(() => {
        if (step === content.selection_index && el.current !== null) {
            setElement(el.current);
        }
    }, [collapsed]);

    const getClasses = () => {
        let classes = content.getClassNames(step);
        if (className) {
            if (typeof className === 'string') {
                classes.push(className);
            } else if (Array.isArray(className)) {
                classes = classes.concat(className);
            }
        }
        classes.push('aics-named-block');
        if (collapsed) {
            classes.push('collapsed');
        }
        return classes.join(' ');
    };

    const handleClick = () => {
        if (content.selection_index !== null) {
            setStep(content.selection_index);
        }
        if (onToggle) {
            onToggle(!collapsed);
        }
    };

    return <div ref={el} className={getClasses()} onClick={handleClick} >
        <CollapsibleBlock title={content.name} collapsed={collapsed} onToggle={onToggle}>
        { content.children.map((child, index) => {
            return factory?.build(child, content);
         })}
        </CollapsibleBlock>
    </div>;
}

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

// FIXME:  Highlight border color of selected list item.
const itemBorderColor = selectedVariants('mode', {
    default: { light: '#ccc', dark: '#595b60' },
    selected: { light: '#ccc', dark: '#595b60' },
});

export const NamedBlock = styled(NamedBlockComponent)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  color: ${textColor};
  background-color: ${backgroundColor};
  border-color: ${borderColor};
`;

export const BlockListItem = styled(NamedBlock)`
    margin: 0;
    padding: 4px 4px 0 0;
    border-width: 0 0 1px 0;
    border-bottom: 1px solid ${itemBorderColor};
    border-radius: 0;

    &:first-child {
        border-radius: 4px 4px 0 0;
    }

    &:last-child {
        border-bottom: none;
        border-radius: 0 0 4px 4px;
    }
`;