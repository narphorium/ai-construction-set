import React, { forwardRef, useCallback, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { themedVariant } from '../../themes/theme'
import { BlockLayout } from '../layouts/BlockLayout'
import { useBlockStore } from '../../hooks/useBlockStore'
import { useClasses } from '../../hooks/useClasses'
import { SelectableComponentProps } from '../behaviors'
import { Paragraph } from '../../types/blocks'
import { Selectable } from '../../types/behaviors'

export interface ParagraphBlockProps extends SelectableComponentProps {
  block: Paragraph & Selectable
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const ParagraphBlockComponent = forwardRef(function ParagraphBlock({ className, block, onClick }: ParagraphBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const blockStore = useBlockStore()
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
    <BlockLayout blocks={children} parent={block} />
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
