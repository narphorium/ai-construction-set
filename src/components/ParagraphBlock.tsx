import React, { forwardRef, useCallback, useContext, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { type Paragraph } from '../data'
import { BlockFactoryContext } from '../hooks'
import { themedVariant } from '../themes/theme'
import { getClasses, type SelectableProps } from './Base'

export interface ParagraphBlockProps extends SelectableProps {
  paragraph: Paragraph
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const ParagraphBlockComponent = forwardRef(function ParagraphBlock ({ className, paragraph, selected, setSelected, onClick, variant }: ParagraphBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }, [onClick])

  return <div ref={ref} key={paragraph.uuid} className={ getClasses('aics-paragraph', className, paragraph.classNames) } onClick={handleClick}>
    <span>
      { factory?.buildAll(paragraph.spans, paragraph) }
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
