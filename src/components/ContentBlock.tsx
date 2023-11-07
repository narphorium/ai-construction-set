import React, { forwardRef, useContext, useEffect, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { type Content } from '../data'
import { BlockFactoryContext } from '../hooks'
import { backgroundColor, borderColor, defaultFont, fontWeight, textColor } from '../themes/theme'
import { type SelectableProps } from './Base'

export interface ContentBlockProps extends SelectableProps {
  content: Content
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export const ContentBlockComponent = forwardRef(function ContentBlock ({ className, content, selected, onSelected, onClick, variant, key }: ContentBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  useEffect(() => {
    if (onSelected !== undefined) {
      onSelected(selected as boolean)
    }
  }, [selected, onSelected])

  const getClasses = (): string => {
    let classes = ['aics-content-block']
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
    return classes.join(' ')
  }

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }

  return <div ref={ref} className={getClasses()} onClick={handleClick}>
         { factory?.buildAll(content.children, content) }
    </div>
})

export const ContentBlock = styled(ContentBlockComponent)`
font-family: ${defaultFont};
font-weight: ${fontWeight};
border-width: 1px;
border-style: solid;
border-radius: 4px;
margin: 4px 0;
color: ${textColor};
background-color: ${backgroundColor};
border-color: ${borderColor};
`
