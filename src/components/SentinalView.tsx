import React, { useContext, useEffect, useRef } from 'react';
import { Selectable } from '../data';
import { SelectedElementContext, SelectedStepContext } from '../hooks';

interface SentinalViewProps {
  sentinal: Selectable,
  key: any
}

export const SentinalView = ({sentinal, key}: SentinalViewProps) => {

    const {step, setStep} = useContext(SelectedStepContext);
    const {element, setElement} = useContext(SelectedElementContext);

    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (step === sentinal.selection_index && el.current !== null) {
        setElement(el.current);
      }
    }, [step]);

    return <div ref={el} className="aics-sentinal"></div>;
};