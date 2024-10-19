import React from 'react'
import { type Block } from '../src/types/blocks'
import { BlockLayout } from '../src/components/layouts/BlockLayout'
import { useStoryContent } from '../src/hooks/useStoryContent'
import { BlockRegistry } from '../src/core/BlockRegistry'

export interface BlockStoryProps<T extends Block> {
  builder: (registry: BlockRegistry) => T
  theme?: string
  selected?: boolean
}

export const BlockStoryTemplate = <T extends Block>({ builder, theme, selected }: BlockStoryProps<T>): JSX.Element => {
  const createAndPersistContent = useStoryContent(builder)
  const block = React.useMemo(() => createAndPersistContent(), [createAndPersistContent]);

  return (
    <BlockLayout blocks={block ? [block] : []} />
  )
}
