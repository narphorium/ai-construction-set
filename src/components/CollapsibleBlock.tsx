import React, { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ScrollFlagContext } from '../hooks';
import { defaultFont, textColor } from './theme';


interface CollapsibleBlockProps {
    children: string | JSX.Element | (JSX.Element | undefined)[];
    className?: string;
    title: string;
    collapsed: boolean | Dispatch<SetStateAction<boolean>>;
    onToggle?: (collapsed: boolean) => void;
    // setCollapsed: Dispatch<SetStateAction<boolean>>;
}

const CollapsibleBlockStyled = styled.div`
  position: relative;
  padding-top: 2px;
  padding-bottom: 2px;

  &.collapsed {
    .aics-collapsible-block-inner {
      margin-top: 0;
      transition: margin-top ease 0.2s;
    }
  }

  &.collapsed > .aics-collapsible-block-header > .aics-collapsible-block-control {
    transform: rotate(-90deg);
    transition: all 0.2s;
  }
`;

const CollapsibleBlockHeaderStyled = styled.div`

`;

const CollapsibleBlockControlStyled = styled.button`
  background-color: transparent;
  border: none;
  color: ${textColor};
  padding: 0;
  vertical-align: text-top;
  height: 1em;
  transition: all 0.2s;
  margin: 5px 2px 0 6px;
  outline: 0;

  &:focus {
    outline: 0;
  }
`;

const CollapsibleBlockTitleStyled = styled.div`
  display: inline-block;
  margin: 2px 0;
  font-family: ${defaultFont};
  font-size: 11pt;
  user-select: none;
  position: relative;

  &:focus {
    outline: 0;
  }

  & i {
    margin-right: 4px;
  }
`;

const CollapsibleBlockContentStyled = styled.div`
  overflow: hidden;
  margin-left: 16px;
  margin-right: 16px;

  &:last-child {
    padding-bottom: 4px;
  }

  & .aics-collapsible-block-content:last-child {
    padding-bottom: 0;
  }
`;

const CollapsibleBlockInnerStyled = styled.div`
  font-size: 10pt;
  transition: margin-top ease 0.2s;

  & > .aics-content-section {
    margin: 4px 8px;
  }
`;

export const CollapsibleBlock = ({ className, children, title, collapsed, onToggle }: CollapsibleBlockProps) => {

  const inner = useRef<HTMLDivElement>(null);

  const {flag, toggle} = useContext(ScrollFlagContext);

  useEffect(() => {
    if (inner.current) {
      if (collapsed) {
        // Animate block collapsing based on the height of the inner content
        // if (inner.current) {
        //   const h = - (inner.current.scrollHeight + 10);
        //   inner.current.setAttribute('style', collapsed ? 'margin-top: 0px' : 'margin-top: ' + h + 'px');
        // }
        const h = - (inner.current.scrollHeight + 30);
        inner.current.setAttribute('style', 'margin-top: ' + h + 'px');
      } else {
        inner.current.setAttribute('style', 'margin-top: 0px');
      }
    }
  }, [collapsed]);

  const getClasses = () => {
    const classes = ['collapsible-block'];
    if (className != undefined) {
      classes.push(className);
    }
    if (collapsed) {
      classes.push('collapsed');
    }
    return classes.join(' ');
  };

  return (<CollapsibleBlockStyled className={getClasses()}>
      <CollapsibleBlockHeaderStyled className="aics-collapsible-block-header">
        <CollapsibleBlockControlStyled className="aics-collapsible-block-control" onClick={(e) => {
          // setCollapsed(!collapsed);
          onToggle?.(collapsed as boolean);
          e.stopPropagation();
        }}><i className={'codicon codicon-chevron-down'}/></CollapsibleBlockControlStyled>
        <CollapsibleBlockTitleStyled className="aics-collapsible-block-title" onClick={(e) => {
          onToggle?.(collapsed as boolean);
          // setCollapsed(!collapsed);
          e.stopPropagation();
        }}>{title}</CollapsibleBlockTitleStyled>
      </CollapsibleBlockHeaderStyled>
      <CollapsibleBlockContentStyled className='aics-collapsible-block-content'>
        <CollapsibleBlockInnerStyled className='aics-collapsible-block-inner' ref={inner} onTransitionEnd={toggle}>
        { children }
        </CollapsibleBlockInnerStyled>
      </CollapsibleBlockContentStyled>
    </CollapsibleBlockStyled>
  );
};
