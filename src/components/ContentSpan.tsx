
import React, { Dispatch, MouseEvent, SetStateAction, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { Span } from "../data";
import { SelectedElementContext, SelectedStepContext } from '../hooks';
import { Variant } from './theme';

interface ContentSpanProps {
  className?: string;
  span: Span;
  variant: Variant;
  setVariant: Dispatch<SetStateAction<Variant>>;
  key: any;
}

const ContentSpanComponent = ({className, span, variant, setVariant, key}: ContentSpanProps) => {

    const {step, setStep} = useContext(SelectedStepContext);
    const {element, setElement} = useContext(SelectedElementContext);

    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (step === span.selection_index) {
        setVariant('selected');
        if (el.current !== null) {
            setElement(el.current);
        }
      } else {  
        setVariant('default');
      }
    }, [step]);

    const getClasses = () => {
      const classes = span.getClassNames(step);
      if (className) {
        classes.push(className);
      }
      classes.push('aics-content-span');
      return classes.join(' ');
    };

    const handleClick = (obj: any ) => ((e: MouseEvent) => {
      if (obj.step !== null) {
        setStep(obj.step);
      }
    });

    return <span className={getClasses()} onClick={handleClick(span)} dangerouslySetInnerHTML={{ 
            __html: span.content }}></span>;
};

const spanTextColor = theme.variants('mode', 'variant', {
    default: { light: '#222', dark: '#eee' },
    selected: { light: '#222', dark: '#ffde98' },
});

const spanBackgroundColor = theme.variants('mode', 'variant', {
    default: { light: 'transparent', dark: 'rgb(253 235 184)' },
    selected: { light: 'transparent', dark: 'rgb(73 69 61)' },
});

export const ContentSpan = styled(ContentSpanComponent)`
  color: ${spanTextColor};
  background-color: ${spanBackgroundColor};
`;