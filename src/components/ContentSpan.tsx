
import React, { Dispatch, MouseEvent, SetStateAction, useContext, useRef } from 'react';
import styled from 'styled-components';
import { Selectable, Span } from "../data";
import { SelectedElementContext, SelectedStepContext } from '../hooks';
import { selectedVariants } from './theme';

interface ContentSpanProps {
  className?: string;
  span: Span;
  selected: boolean | Dispatch<SetStateAction<boolean>>;
  onSelected?: (selected: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  key: any;
}

const ContentSpanComponent = ({className, span, selected, onSelected, onClick, key}: ContentSpanProps) => {

    const {step, setStep} = useContext(SelectedStepContext);
    const {element, setElement} = useContext(SelectedElementContext);
    const el = useRef<HTMLSpanElement>(null);

    const getClasses = () => {
      const classes = span.getClassNames(step);
      if (className) {
        classes.push(className);
      }
      classes.push('aics-content-span');
      return classes.join(' ');
    };

    const handleClick = (obj: Selectable ) => ((e: MouseEvent) => {
      if (obj.selection_index !== null) {
        setStep(obj.selection_index);
      }
    });

    return <span ref={el} className={getClasses()} onClick={handleClick(span)} dangerouslySetInnerHTML={{ 
            __html: span.content }}></span>;
};

const spanTextColor = selectedVariants('mode', {
    default: { light: '#222', dark: '#eee' },
    selected: { light: '#222', dark: '#ffde98' },
});

const spanBackgroundColor = selectedVariants('mode', {
    default: { light: 'transparent', dark: 'transparent' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});

export const ContentSpan = styled(ContentSpanComponent)`
  color: ${spanTextColor};
  background-color: ${spanBackgroundColor};

  a {
    color: ${spanTextColor};
  }
`;