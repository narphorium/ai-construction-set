import React, { forwardRef, useContext, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { type Content } from '../data'
import { BlockFactoryContext } from '../hooks'
import { themedVariant } from '../themes/theme'
import { getClasses, type SelectableProps } from './Base'

export interface ContentBlockProps extends SelectableProps {
  block: Content
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export const ContentBlockComponent = forwardRef(function ContentBlock ({ className, block, onClick }: ContentBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  const getContentClasses = (block: Content, className: string | string[] | undefined): string => {
    return getClasses('aics-content-block', className, block.classNames)
  }

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }

  return <div ref={ref} key={block.uuid} className={getContentClasses(block, className)} onClick={handleClick}>
         { factory?.buildAll(block.children, block) }
    </div>
})

ContentBlockComponent.displayName = 'ContentBlock'

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

> .aics-list {
  margin: 8px 12px;
}
`
