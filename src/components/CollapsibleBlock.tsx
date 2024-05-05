import React, { forwardRef, useCallback, useContext, useEffect, useRef, type ForwardedRef } from 'react'
import { styled } from 'styled-components'
import { type Collapsible } from '../data'
import { BlockFactoryContext } from '../hooks'
import { themedIcon } from '../themes/icons'
import { themedVariant } from '../themes/theme'
import { getClasses, type CollapsibleProps, type SelectableProps } from './Base'

export interface CollapsibleBlockProps extends SelectableProps, CollapsibleProps {
  content: Collapsible
}

export const CollapsibleBlockComponent = forwardRef(function CollapsibleBlock ({ className, content, collapsed, selected, setCollapsed: onToggle, setSelected: onSelected, onTransitionEnd, variant }: CollapsibleBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
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

  const getBlockClasses = (className: any, content: Collapsible, collapsed: boolean | undefined): string => {
    return getClasses(
      'aics-collapsible-block',
      className,
      content.classNames,
      () => collapsed === true ? ['collapsed'] : [],
      () => content.icon !== undefined ? ['has-icon'] : [])
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (onToggle !== undefined && collapsed !== undefined) {
      onToggle(!collapsed)
      e.stopPropagation()
    }
  }

  return (<div ref={ref} className={getBlockClasses(className, content, collapsed)} key={content.uuid}>
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
})

CollapsibleBlockComponent.displayName = 'CollapsibleBlock'

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
    font-size: ${themedVariant('fontSize')};

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
      background-image: ${themedIcon('right', 20, themedVariant('secondaryTextColor'))};
      background-repeat: no-repeat;
    }
  }

  & .aics-collapsible-block-title {
    display: inline-block;
    margin: 2px 0;
    padding: ${themedVariant('collapsibleTitlePadding')};
    color: ${themedVariant('collapsibleTextColor')};
    font-family: ${themedVariant('collapsibleFontFamily')};
    font-size: ${themedVariant('collaspibleFontSize')};
    font-weight: ${themedVariant('collapsibleFontWeight')};
    user-select: none;
    position: relative;

    :focus {
      outline: 0;
    }

    
  }

  &.has-icon .aics-collapsible-block-title {
    padding-left: 44px;
    background-position: 24px center;
    background-size: contain;
    background-image: ${(props) => props.content.icon !== undefined ? themedIcon(props.content.icon, 20, themedVariant('textColor')) : ''};
    background-repeat: no-repeat;
  }

  & .aics-collapsible-block-content {
    overflow: hidden;
    margin: ${themedVariant('collapsiblePadding')};
    font-size: ${themedVariant('fontSize')};
  }

  & .aics-collapsible-block-inner {
    font-size: ${themedVariant('fontSize')};
    transition: margin-top ease 0.2s;

    > .aics-collapsible-block {
      margin-top: 4px;
    }

    > .aics-paragraph {
      margin-left: 0;
      margin-right: 0;
    }
  }
`
