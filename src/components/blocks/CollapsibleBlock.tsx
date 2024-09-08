import React, { forwardRef, useCallback, useEffect, useRef, type ForwardedRef } from 'react'
import { styled } from 'styled-components'
import { themedIcon } from '../../themes/icons'
import { themedVariant } from '../../themes/theme'
import { BlockLayout } from '../layouts/BlockLayout'
import { CollapsibleComponentProps, SelectableComponentProps } from '../behaviors'
import { Collapsible, Selectable } from '../../types/behaviors'
import { Section } from '../../types/blocks'
import { useBlockStore } from '../../hooks/useBlockStore'
import { useClasses } from '../../hooks/useClasses'

export interface CollapsibleBlockProps extends SelectableComponentProps, CollapsibleComponentProps {
  block: Section & Collapsible & Selectable
}

export const CollapsibleBlockComponent = forwardRef(function CollapsibleBlock({ className, block, setCollapsed, onTransitionEnd }: CollapsibleBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {

  const blockStore = useBlockStore()
  const children = blockStore.getChildBlocks(block.uuid)
  const inner = useRef<HTMLDivElement>(null)

  const updateInner = useCallback(() => {
    console.log('updateInner', inner.current, block.collapsed)
    if (inner.current != null) {
      if (block.collapsed) {
        const h = -(inner.current.offsetHeight + 40)
        inner.current.setAttribute('style', 'margin-top: ' + h + 'px')
      } else {
        inner.current.setAttribute('style', 'margin-top: 0px')
      }
    }
  }, [block.collapsed])

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
    console.log('CollapsibleBlock useEffect', block.collapsed)
    updateInner()
  }, [block.collapsed, updateInner, setCollapsed])

  const blockClasses = useClasses([
    'aics-collapsible-block',
    className,
    block.classNames,
    () => block.icon !== undefined ? ['has-icon'] : []
  ], [className, block.classNames, block.icon])

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    block.toggleCollapsed()
    if (setCollapsed !== undefined && block.collapsed !== undefined) {
      setCollapsed(!block.collapsed)
      e.stopPropagation()
    }
  }

  return (<div ref={ref} className={blockClasses} key={block.uuid}>
    <div className="aics-collapsible-block-header">
      <div className="aics-collapsible-block-control" onClick={handleClick}><span></span></div>
      <div className="aics-collapsible-block-title" onClick={handleClick}>{block.summary}</div>
    </div>
    <div className='aics-collapsible-block-content'>
      <div className='aics-collapsible-block-inner' ref={inner} onTransitionEnd={onTransitionEnd}>
        <BlockLayout blocks={children} parent={block} />
      </div>
    </div>
  </div>
  )
})

CollapsibleBlockComponent.displayName = 'CollapsibleBlock'

export const CollapsibleBlock = styled(CollapsibleBlockComponent)`
position: relative;
display: ${themedVariant('blockDisplay')};
font-family: ${themedVariant('fontFamily')};
font-weight: ${themedVariant('fontWeight')};
border-width: 1px;
border-style: solid;
border-radius: 4px;
margin: 4px 0;
color: ${themedVariant('textColor')};
background-color: ${themedVariant('contentBackgroundColor')};
border-color: ${themedVariant('borderColor')};

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
    background-image: ${(props) => props.block.icon !== undefined ? themedIcon(props.block.icon, 20, themedVariant('textColor')) : ''};
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
