import React, { forwardRef, useCallback, useContext, useEffect, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { type Paragraph } from '../data'
import { BlockFactoryContext } from '../hooks'
import { defaultFont, spanBackgroundColor, spanTextColor } from '../themes/theme'
import { getClasses, type SelectableProps } from './Base'

export interface ParagraphBlockProps extends SelectableProps {
  paragraph: Paragraph
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const ParagraphBlockComponent = forwardRef(function ParagraphBlock ({ className, paragraph, selected, onSelected, onClick, variant, key }: ParagraphBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  useEffect(() => {
    if (onSelected !== undefined) {
      onSelected(selected as boolean)
    }
  }, [selected, onSelected])

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }, [onClick])

  return <div ref={ref} className={ getClasses('aics-paragraph', className, paragraph.classNames) } onClick={handleClick}>
    <span>
      { factory?.buildAll(paragraph.spans, paragraph) }
    </span>
  </div>
})

export const ParagraphBlock = styled(ParagraphBlockComponent)`
font-family: ${defaultFont};
  font-size: 11pt;
  margin: 12px 16px;


  &.selected > span {
    color: ${spanTextColor};
    background-color: ${spanBackgroundColor};
  }
`
