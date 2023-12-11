import React, { forwardRef, useContext, useEffect, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { type Content } from '../data'
import { BlockFactoryContext } from '../hooks'
import { themedVariant } from '../themes/theme'
import { getClasses, type SelectableProps } from './Base'

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

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }

  return <div ref={ref} className={getClasses('aics-content-block', className, content.classNames)} onClick={handleClick}>
         { factory?.buildAll(content.children, content) }
    </div>
})

export const ContentBlock = styled(ContentBlockComponent)`
font-family: ${themedVariant('fontFamily')};
font-weight: ${themedVariant('fontWeight')};
border-width: 1px;
border-style: solid;
border-radius: 4px;
margin: 4px 0;
color: ${themedVariant('textColor')};
background-color: ${themedVariant('contentBackgroundColor')};
border-color: ${themedVariant('borderColor')};
`
