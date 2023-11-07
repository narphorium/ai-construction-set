import React, { useCallback, useEffect, useRef } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { styled } from 'styled-components'
import { themedIcon } from '../themes/icons'
import { defaultFont, textColor } from '../themes/theme'
import { type CollapsibleProps } from './Base'

export interface CollapsibleBlockProps extends CollapsibleProps {
  children: string | JSX.Element | JSX.Element[] | undefined
  title: string
}

export const CollapsibleBlockComponent = function CollapsibleBlock ({ className, children, title, collapsed, onToggle, onTransitionEnd, variant }: CollapsibleBlockProps): JSX.Element {
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
    let classes = ['collapsible-block']
    if (className !== undefined) {
      if (typeof className === 'string') {
        classes.push(className)
      } else if (Array.isArray(className)) {
        classes = classes.concat(className)
      }
    }
    if (collapsed === true) {
      classes.push('collapsed')
    }
    return classes.join(' ')
  }

  return (<div className={getClasses()}>
      <div className="aics-collapsible-block-header">
        <div className="aics-collapsible-block-control" onClick={(e) => {
          onToggle?.(collapsed as boolean)
          e.stopPropagation()
        }}><span></span></div>
        <div className="aics-collapsible-block-title" onClick={(e) => {
          onToggle?.(collapsed as boolean)
          e.stopPropagation()
        }}>{title}</div>
      </div>
      <div className='aics-collapsible-block-content'>
        <div className='aics-collapsible-block-inner' ref={inner} onTransitionEnd={onTransitionEnd}>
        { children }
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
    color: ${textColor};
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
      background-image: ${themedIcon('chevron-right', textColor)};
      background-repeat: no-repeat;
    }
  }

  & .aics-collapsible-block-title {
    display: inline-block;
    margin: 2px 0;
    padding-left: 22px;
    font-family: ${defaultFont};
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

    > .aics-named-block {
      margin-top: 4px;
    }
  }
`
