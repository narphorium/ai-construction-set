
import React, { Dispatch, MouseEvent, SetStateAction, useContext, useRef } from 'react';
import styled from 'styled-components';
import { Section } from "../data";
import { BlockFactoryContext, SelectedElementContext, SelectedStepContext } from '../hooks';
import { fontWeight } from './theme';

interface ContentSectionProps {
  className?: string;
  section: Section;
  selected: boolean | Dispatch<SetStateAction<boolean>>;
  onSelected?: (selected: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  key: any;
}

const ContentSectionComponent = ({className, section, selected, onSelected, onClick, key}: ContentSectionProps) => {

  const {step, setStep} = useContext(SelectedStepContext);
  const {element, setElement} = useContext(SelectedElementContext);
  const el = useRef<HTMLDivElement>(null);
  const {factory, setFactory} = useContext(BlockFactoryContext);

  const getClasses = () => {
    const classes = section.getClassNames(step);
    if (className) {
      classes.push(className);
    }
    classes.push('aics-content-section');
    return classes.join(' ');
  };

  const handleClick = (obj: any ) => ((e: MouseEvent) => {
    if (obj.step !== null) {
      setStep(obj.step);
    }
  });

  return <div ref={el} className={ getClasses() } onClick={handleClick(section)}>
      <label>{ section.name ? section.name + ': ' : '' }</label>
      { section.spans.map((span) => {
        return factory?.build(span, section);
      }) }
  </div>;
};

export const ContentSection = styled(ContentSectionComponent)`
  line-height: 1.3em;
  font-size: 11pt;
  margin: 12px 16px;

  & > label {
    font-weight: calc(${fontWeight} + 200);
  }
`;

