import React from 'react'
import { type Block } from '../types/blocks'
import { BlockLayout } from '../components/layouts/BlockLayout'
import { useStoryContent } from '../hooks/useStoryContent'
import { BlockRegistry } from '../state/BlockRegistry'

interface BlockStoryProps<T extends Block> {
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
