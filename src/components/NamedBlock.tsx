
import React, { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { NamedContent } from '../data';
import { BlockFactoryContext, SelectedElementContext, SelectedStepContext } from '../hooks';
import { CollapsibleBlock, } from './CollapsibleBlock';
import { Variant } from './theme';

interface NamedBlockProps {
    className?: string,
    content: NamedContent, 
    collapsed: boolean,
    setCollapsed: Dispatch<SetStateAction<boolean>>,
    variant: Variant;
  setVariant: Dispatch<SetStateAction<Variant>>;
    key: any
}

const NamedBlockComponent = ({className, content, collapsed, setCollapsed, variant, setVariant, key}: NamedBlockProps) => {

    const {step, setStep} = useContext(SelectedStepContext);
    const {element, setElement} = useContext(SelectedElementContext);
    const el = useRef<HTMLDivElement>(null);
    const {factory, setFactory} = useContext(BlockFactoryContext);

    useEffect(() => {
        if (step === content.selection_index) {
            setVariant('selected');
          if (el.current !== null) {
              setElement(el.current);
          }
        } else {  
            setVariant('default');
        }
        setCollapsed(!content.containsSelected(step));
    }, [step]);

    useEffect(() => {
        if (step === content.selection_index && el.current !== null) {
            setElement(el.current);
        }
    }, [collapsed]);

    const getClasses = () => {
        const classes = content.getClassNames(step);
        if (className) {
            classes.push(className);
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
    };

    return <div ref={el} className={getClasses()} onClick={handleClick} >
        <CollapsibleBlock title={content.name} collapsed={collapsed} setCollapsed={setCollapsed}>
        { content.children.map((child, index) => {
            return factory?.build(child, index, content);
         })}
        </CollapsibleBlock>
    </div>;
}

const textColor = theme.variants('mode', 'variant', {
    default: { light: '#222', dark: '#292b2f' },
    selected: { light: '#222', dark: '#ffde98' },
});

const backgroundColor = theme.variants('mode', 'variant', {
    default: { light: 'white', dark: '#292b2f' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});

const borderColor = theme.variants('mode', 'variant', {
    default: { light: '#ccc', dark: '#595b60' },
    selected: { light: 'rgb(237, 211, 137)', dark: 'rgb(109 102 81)' },
});

export const NamedBlock = styled(NamedBlockComponent)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 8px 0 0 0;
  color: ${textColor};
  background-color: ${backgroundColor};
  border-color: ${borderColor};
`;

export const BlockListItem = styled(NamedBlock)`
    margin: 0;
    padding: 4px 4px 0 0;
    border-width: 0 0 1px 0;
    border-bottom: 1px solid ${borderColor};
    border-radius: 0;

    &:first-child {
        border-radius: 4px 0 0 4px;
    }

    &:last-child {
        border-bottom: none;
        border-radius: 0 4px 4px 0;
    }
`;