import React, { useCallback, useEffect, useRef, type Dispatch, type SetStateAction } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { styled } from 'styled-components'
import { chevronRight } from '../assets/icons'
import { Icon } from './Icon'
import { defaultFont, textColor } from './theme'

interface CollapsibleBlockProps {
  children: string | JSX.Element | Array<JSX.Element | undefined>
  className?: string
  title: string
  collapsed?: boolean | Dispatch<SetStateAction<boolean>>
  onToggle?: (collapsed: boolean) => void
  onTransitionEnd?: () => void
}

const CollapsibleBlockStyled = styled.div`
  position: relative;

  &.collapsed {
    .aics-collapsible-block-inner {
      margin-top: 0;
      transition: margin-top ease 0.2s;
    }
    .aics-collapsible-block-content {
      padding: 0;
    }
  }

  & > .aics-collapsible-block-header > .aics-collapsible-block-control svg {
    transition: all 0.2s;
    transform: rotate(90deg);
  }

  &.collapsed > .aics-collapsible-block-header > .aics-collapsible-block-control svg {
    transform: rotate(0deg);
  }
`

const CollapsibleBlockHeaderStyled = styled.div`
  position: relative;
  font-size: 11pt;
`

const CollapsibleBlockControlStyled = styled.button`
  position: absolute;
  top: 0;
  left: 4px;
  background-color: transparent;
  border: none;
  color: ${textColor};
  padding: 0;
  margin: 0;
  font-size: 11pt;
  vertical-align: text-top;
  height: 1em;
  transition: all 0.2s;
  outline: 0;

  &:focus {
    outline: 0;
  }

  & svg path {
    fill: ${textColor};
  }
`

const CollapsibleBlockTitleStyled = styled.div`
  display: inline-block;
  margin: 2px 0;
  padding-left: 22px;
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
`

const CollapsibleBlockContentStyled = styled.div`
  overflow: hidden;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 10pt;

  &:last-child {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`

const CollapsibleBlockInnerStyled = styled.div`
  font-size: 10pt;
  transition: margin-top ease 0.2s;

  & > .aics-named-block {
    margin-top: 4px;
  }
`

export const CollapsibleBlock = function CollapsibleBlock ({ className, children, title, collapsed, onToggle, onTransitionEnd }: CollapsibleBlockProps): JSX.Element {
  const inner = useRef<HTMLDivElement>(null)

  const updateInner = useCallback(() => {
    if (inner.current != null) {
      if (collapsed === true) {
        const h = -(inner.current.offsetHeight + 40)
        inner.current.setAttribute('style', 'margin-top: ' + h + 'px')
      } else {
        inner.current.setAttribute('style', 'margin-top: 0px')
      }
    }
  }, [inner, collapsed])

  useResizeDetector({
    targetRef: inner,
    onResize: () => {
      updateInner()
    }
  })

  useEffect(() => {
    updateInner()
  }, [])

  useEffect(() => {
    updateInner()
  }, [collapsed, updateInner])

  const getClasses = (): string => {
    const classes = ['collapsible-block']
    if (className !== undefined) {
      classes.push(className)
    }
    if (collapsed === true) {
      classes.push('collapsed')
    }
    return classes.join(' ')
  }

  return (<CollapsibleBlockStyled className={getClasses()}>
      <CollapsibleBlockHeaderStyled className="aics-collapsible-block-header">
        <CollapsibleBlockControlStyled className="aics-collapsible-block-control" onClick={(e) => {
          onToggle?.(collapsed as boolean)
          e.stopPropagation()
        }}><Icon svg={chevronRight}/></CollapsibleBlockControlStyled>
        <CollapsibleBlockTitleStyled className="aics-collapsible-block-title" onClick={(e) => {
          onToggle?.(collapsed as boolean)
          e.stopPropagation()
        }}>{title}</CollapsibleBlockTitleStyled>
      </CollapsibleBlockHeaderStyled>
      <CollapsibleBlockContentStyled className='aics-collapsible-block-content'>
        <CollapsibleBlockInnerStyled className='aics-collapsible-block-inner' ref={inner} onTransitionEnd={onTransitionEnd}>
        { children }
        </CollapsibleBlockInnerStyled>
      </CollapsibleBlockContentStyled>
    </CollapsibleBlockStyled>
  )
}
