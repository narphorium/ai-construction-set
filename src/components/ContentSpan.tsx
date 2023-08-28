
import React, { Dispatch, ForwardedRef, MouseEvent, SetStateAction, forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import { Selectable, Span } from "../data";
import { selectedVariants } from './theme';

interface ContentSpanProps {
  className?: string;
  span: Span;
  selected?: boolean | Dispatch<SetStateAction<boolean>>;
  onSelected?: (selected: boolean) => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  key: any;
}

const ContentSpanComponent = forwardRef(({className, span, selected, onSelected, onClick, key}: ContentSpanProps, ref: ForwardedRef<HTMLSpanElement>) => {

    useEffect(() => {
        if (onSelected !== undefined) {
            onSelected(selected as boolean);
        }
    }, [selected]);

    const getClasses = () => {
      const classes = ['aics-content-span'];
      if (className) {
        classes.push(className);
      }
      if (selected) {
        classes.push('selected');
      }
      return classes.join(' ');
    };

    const handleClick = (obj: Selectable ) => ((e: MouseEvent<HTMLDivElement>) => {
      if (onClick !== undefined) {
        onClick(e);
      }
    });

    return <span ref={ref} className={getClasses()} onClick={handleClick(span)} dangerouslySetInnerHTML={{ 
            __html: span.content }}></span>;
});

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