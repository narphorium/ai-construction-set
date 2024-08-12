import React, { forwardRef, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { type Section } from '../../types/blocks'
import { themedVariant } from '../../themes/theme'
import { BlockLayout } from '../layouts/BlockLayout'
import { useBlockStore } from '../../hooks/useBlockStore'
import { useClasses } from '../../hooks/useClasses'
import { SelectableComponentProps } from '../behaviors'
import { Selectable } from '../../types/behaviors'

export interface ContentBlockProps extends SelectableComponentProps {
  block: Section & Selectable
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export const ContentBlockComponent = forwardRef(function ContentBlock({ className, block, onClick }: ContentBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const blockStore = useBlockStore()
  const children = blockStore.getChildBlocks(block.uuid)

  const contentClasses = useClasses([
    'aics-content-block',
    className,
    block.classNames
  ], [className, block.classNames])

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }

  return <div ref={ref} key={block.uuid} className={contentClasses} onClick={handleClick}>
    <BlockLayout blocks={children} parent={block} />
  </div>
})

ContentBlockComponent.displayName = 'ContentBlock'

export const ContentBlock = styled(ContentBlockComponent)`
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

> .aics-list {
  margin: 8px 12px;
}
`
