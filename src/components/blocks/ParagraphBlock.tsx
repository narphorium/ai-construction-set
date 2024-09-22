import React, { forwardRef, useCallback, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { themedVariant } from '../../themes/theme'
import { useBlockStore } from '../../hooks/useBlockStore'
import { useClasses } from '../../hooks/useClasses'
import { SelectableComponentProps } from '../behaviors'
import { Paragraph } from '../../types/blocks'
import { Selectable } from '../../types/behaviors'
import { useBlockRenderer } from '../../hooks'

export interface ParagraphBlockProps extends SelectableComponentProps {
  block: Paragraph & Selectable
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const ParagraphBlockComponent = forwardRef(function ParagraphBlock({ className, block, onClick }: ParagraphBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const blockStore = useBlockStore()
  const renderer = useBlockRenderer()
  const children = blockStore.getChildBlocks(block.uuid)

  const paragraphClasses = useClasses([
    'aics-paragraph',
    className,
    block.classNames
  ], [className, block.classNames])

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }, [onClick])

  return <div ref={ref} key={block.uuid} className={paragraphClasses} onClick={handleClick}>
    {children.map((child) => renderer?.render(child, block))}
  </div>
})

ParagraphBlockComponent.displayName = 'ParagraphBlock'

export const ParagraphBlock = styled(ParagraphBlockComponent)`
font-family: ${themedVariant('fontFamily')};
font-size: ${themedVariant('fontSize')};
margin: 8px 16px;


&.selected > span {
  color: ${themedVariant('spanTextColor')};
  background-color: ${themedVariant('spanBackgroundColor')};
}
`
