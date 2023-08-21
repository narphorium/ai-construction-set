
import React, { Dispatch, MouseEvent, SetStateAction, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Section } from "../data";
import { BlockFactoryContext, SelectedElementContext, SelectedStepContext } from '../hooks';
import { Variant, fontWeight } from './theme';

interface ContentSectionProps {
  className?: string;
  section: Section;
  variant: Variant;
    setVariant: Dispatch<SetStateAction<Variant>>;
  key: any;
}

const ContentSectionComponent = ({className, section, variant, setVariant, key}: ContentSectionProps) => {

    const {step, setStep} = useContext(SelectedStepContext);
    const {element, setElement} = useContext(SelectedElementContext);
    const {factory, setFactory} = useContext(BlockFactoryContext);

    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (step === section.selection_index && el.current !== null) {
        setElement(el.current);
      }
    }, [step]);

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
        { section.spans.map((span, index) => {
          return factory?.build(span, index, section);
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

