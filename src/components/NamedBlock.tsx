import React, { forwardRef, useContext, useEffect, type ForwardedRef } from 'react'
import { styled } from 'styled-components'
import { type NamedContent } from '../data'
import { BlockFactoryContext } from '../hooks'
import { backgroundColor, borderColor, textColor } from '../themes/theme'
import { type CollapsibleProps, type SelectableProps } from './Base'
import { CollapsibleBlock } from './CollapsibleBlock'

export interface NamedBlockProps extends SelectableProps, CollapsibleProps {
  content: NamedContent
}

const NamedBlockComponent = forwardRef(function NamedBlock ({ className, content, collapsed, selected, onToggle, onSelected, onTransitionEnd, variant, key }: NamedBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  useEffect(() => {
    if (onSelected !== undefined) {
      onSelected(selected as boolean)
    }
  }, [selected, onSelected])

  const getClasses = (): string => {
    let classes = ['aics-named-block']
    if (className !== undefined) {
      if (typeof className === 'string') {
        classes.push(className)
      } else if (Array.isArray(className)) {
        classes = classes.concat(className)
      }
    }
    if (selected === true) {
      classes.push('selected')
    }
    if (collapsed === true) {
      classes.push('collapsed')
    }
    return classes.join(' ')
  }

  const handleClick = (): void => {
    if (onToggle !== undefined && collapsed !== undefined) {
      onToggle(!(collapsed as boolean))
    }
  }

  return <div ref={ref} className={getClasses()} onClick={handleClick} >
        <CollapsibleBlock title={content.name} collapsed={collapsed} onToggle={onToggle} onTransitionEnd={onTransitionEnd} variant={variant} key={content.uuid}>
        { factory?.buildAll(content.children, content) }
        </CollapsibleBlock>
    </div>
})

export const NamedBlock = styled(NamedBlockComponent)`
    padding: 4px 0;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    color: ${textColor};
    background-color: ${backgroundColor};
    border-color: ${borderColor};

    & .aics-content-section,
    & .aics-block-list,
    & .aics-name-block {
        margin: 8px 0;
    }

    & .aics-content-section:first-child,
    & .aics-block-list:first-child,
    & .aics-name-block:first-child {
        margin-top: 0;
    }

    & .aics-content-section:last-child,
    & .aics-block-list:first-child,
    & .aics-name-block:first-child {
        margin-bottom: 0;
    }
`

export const BlockListItem = styled(NamedBlock)`
    margin: 0;
    border-width: 0 0 1px 0;
    border-bottom: 1px solid ${borderColor};
    border-radius: 0;

    &:first-child {
        border-radius: 4px 4px 0 0;
    }

    &:last-child {
        border-bottom: none;
        border-radius: 0 0 4px 4px;
    }
`
