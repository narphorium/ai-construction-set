import React, { Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { Content } from '../data';
import { BlockFactoryContext, SelectedElementContext, SelectedStepContext } from '../hooks';
import { Variant } from './theme';

interface ContentBlockProps {
    className?: string;
    content: Content;
    variant: Variant;
    setVariant: Dispatch<SetStateAction<Variant>>;
    key: number;
}

export const ContentBlockComponent = ({className, content, variant, setVariant, key}: ContentBlockProps) => {

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
    }, [step]);

    const getClasses = () => {
        const classes = content.getClassNames(step);
        if (className) {
            classes.push(className);
        }
        classes.push('aics-content-block');
        return classes.join(' ');
    };

    const handleClick = useCallback(() => {
        if (content.selection_index !== null) {
            setStep(content.selection_index);
        }
    }, [step]);

    return <div ref={el} className={getClasses()} onClick={handleClick}>
         { content.children.map((child, index) => {
            return factory?.build(child, index, content);
         })}
    </div>;
};

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


export const ContentBlock = styled(ContentBlockComponent)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 4px 0;
  color: ${textColor};
  background-color: ${backgroundColor};
  border-color: ${borderColor};
`;