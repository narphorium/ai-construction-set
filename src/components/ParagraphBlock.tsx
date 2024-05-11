import React, { forwardRef, useCallback, useContext, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { type Paragraph } from '../data'
import { BlockFactoryContext } from '../hooks'
import { themedVariant } from '../themes/theme'
import { getClasses, type SelectableProps } from './Base'

export interface ParagraphBlockProps extends SelectableProps {
  block: Paragraph
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const ParagraphBlockComponent = forwardRef(function ParagraphBlock ({ className, block, onClick }: ParagraphBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  const getParagraphClasses = (block: Paragraph, className: string | string[] | undefined): string => {
    return getClasses('aics-paragraph', className, block.classNames)
  }

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }, [onClick])

  return <div ref={ref} key={block.uuid} className={ getParagraphClasses(block, className) } onClick={handleClick}>
    <span>
      { factory?.buildAll(block.spans, block) }
    </span>
  </div>
})

ParagraphBlockComponent.displayName = 'ParagraphBlock'

export const ParagraphBlock = styled(ParagraphBlockComponent)`
font-family: ${themedVariant('fontFamily')};
font-size: ${themedVariant('fontSize')};
margin: 12px 16px;


&.selected > span {
  color: ${themedVariant('spanTextColor')};
  background-color: ${themedVariant('spanBackgroundColor')};
}
`
