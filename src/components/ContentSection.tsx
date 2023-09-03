
import React, { Dispatch, ForwardedRef, MouseEvent, SetStateAction, forwardRef, useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Section } from "../data";
import { BlockFactoryContext } from '../hooks';
import { fontWeight, selectedVariants } from './theme';

interface ContentSectionProps {
  className?: string | string[];
  section: Section;
  selected?: boolean | Dispatch<SetStateAction<boolean>>;
  onSelected?: (selected: boolean) => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  key: any;
}

const ContentSectionComponent = forwardRef(({className, section, selected, onSelected, onClick, key}: ContentSectionProps, ref: ForwardedRef<HTMLDivElement>) => {

  const {factory, setFactory} = useContext(BlockFactoryContext);

  useEffect(() => {
    if (onSelected !== undefined) {
      onSelected(selected as boolean);
    }
  }, [selected]);

  const getClasses = () => {
    let classes = ['aics-content-section'];
    if (className) {
      if (typeof className === 'string') {
        classes.push(className);
    } else if (Array.isArray(className)) {
        classes = classes.concat(className);
    }
    }
    if (selected) {
      classes.push('selected');
    }
    return classes.join(' ');
  };

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (onClick !== undefined) {
      onClick(e);
    }
  }, [onClick]);

  return <div ref={ref} className={ getClasses() } onClick={handleClick}>
    <span>
      <label>{ section.name ? section.name + ': ' : '' }</label>
      { section.spans.map((span) => {
        return factory?.build(span, section);
      }) }
    </span>
  </div>;
});

const textColor = selectedVariants('mode', {
  default: { light: '#222', dark: '#eee' },
  selected: { light: '#222', dark: '#ffde98' },
});

const backgroundColor = selectedVariants('mode', {
  default: { light: 'transparent', dark: 'transparent' },
  selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});

export const ContentSection = styled(ContentSectionComponent)`
  font-size: 11pt;
  margin: 12px 16px;

  & label {
    font-weight: calc(${fontWeight} + 200);
  }

  &.selected > span {
    color: ${textColor};
    background-color: ${backgroundColor};
  }
`;

