import React, { useCallback, useContext, useEffect, useRef, type ForwardedRef } from 'react'
import { styled } from 'styled-components'
import { type Collapsible } from '../data'
import { BlockFactoryContext } from '../hooks'
import { themedIcon } from '../themes/icons'
import { themedVariant } from '../themes/theme'
import { getClasses, type CollapsibleProps, type SelectableProps } from './Base'

export interface CollapsibleBlockProps extends SelectableProps, CollapsibleProps {
  content: Collapsible
}

export const CollapsibleBlockComponent = function CollapsibleBlock ({ className, content, collapsed, selected, onToggle, onSelected, onTransitionEnd, variant, key }: CollapsibleBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)
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

  // FIXME: This was causing a loop of updates
  // useResizeDetector({
  //   targetRef: inner,
  //   onResize: () => {
  //     updateInner()
  //   }
  // })

  useEffect(() => {
    updateInner()
  }, [])

  useEffect(() => {
    updateInner()
  }, [collapsed, updateInner])

  useEffect(() => {
    if (onSelected !== undefined) {
      onSelected(selected as boolean)
    }
  }, [selected, onSelected])

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (onToggle !== undefined && collapsed !== undefined) {
      onToggle(collapsed)
      e.stopPropagation()
    }
  }

  return (<div className={getClasses('aics-collapsible-block', className, content.classNames, () => collapsed === true ? ['collapsed'] : [])}>
      <div className="aics-collapsible-block-header">
        <div className="aics-collapsible-block-control" onClick={handleClick}><span></span></div>
        <div className="aics-collapsible-block-title" onClick={handleClick}>{ content.name }</div>
      </div>
      <div className='aics-collapsible-block-content'>
        <div className='aics-collapsible-block-inner' ref={inner} onTransitionEnd={onTransitionEnd}>
        { factory?.buildAll(content.children, content) }
        </div>
      </div>
    </div>
  )
}

export const CollapsibleBlock = styled(CollapsibleBlockComponent)`
position: relative;

  &.collapsed {
    > .aics-collapsible-block-inner {
      margin-top: 0;
      transition: margin-top ease 0.2s;
    }

    > .aics-collapsible-block-header > .aics-collapsible-block-control ::before {
      transform: rotate(0deg);
    }

    > .aics-collapsible-block-content {
      margin: 0;
    }
  }

  & > .aics-collapsible-block-header {
    position: relative;
    font-size: 11pt;

    > .aics-collapsible-block-control ::before {
      transition: all 0.2s;
      transform: rotate(90deg);
    }
  }

  & .aics-collapsible-block-control {
    position: absolute;
    top: 0;
    left: 4px;
    background-color: transparent;
    border: none;
    color: ${themedVariant('textColor')};
    padding: 0;
    margin: 0;
    font-size: 11pt;
    vertical-align: text-top;
    
    transition: all 0.2s;
    outline: 0;
    width: 20px;
    height: 20px;
    display: inline-block;

    :focus {
      outline: 0;
    }

    ::before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: ${themedIcon('chevron-right', 20, themedVariant('textColor'))};
      background-repeat: no-repeat;
    }
  }

  & .aics-collapsible-block-title {
    display: inline-block;
    margin: 2px 0;
    padding-left: 22px;
    font-family: ${themedVariant('fontFamily')};
    font-size: 11pt;
    user-select: none;
    position: relative;

    :focus {
      outline: 0;
    }
  }

  & .aics-collapsible-block-content {
    overflow: hidden;
    margin: 4px 16px;
    font-size: 10pt;
  }

  & .aics-collapsible-block-inner {
    font-size: 10pt;
    transition: margin-top ease 0.2s;

    > .aics-collapsible-block {
      margin-top: 4px;
    }
  }
`

export const ListLayoutItem = styled(CollapsibleBlock)`
  padding: 4px 0;
  margin: 0;
  color: ${themedVariant('textColor')};
  background-color: ${themedVariant('contentBackgroundColor')};
  border-style: solid;
  border-color: ${themedVariant('borderColor')};
  border-top-width: 0;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-radius: 0;

  & .aics-paragraph:first-child,
  & .aics-list:first-child,
  & .aics-collapsible-block:first-child {
      margin-top: 0;
  }

  & .aics-paragraph:last-child,
  & .aics-list:first-child,
  & .aics-collapsible-block:first-child {
      margin-bottom: 0;
  }

  &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-top-width: 1px;
  }

  &:last-child {
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
  }
`
