import React from 'react'
import { type Block, Section } from '../types/blocks'
import { BlockLayout } from '../components/layouts/BlockLayout'
import { useBlockRegistry, useBlockStore } from '../hooks'
import { useDocument } from '../hooks/useDocument'

interface BlockStoryProps<T extends Block> {
  builder: () => T
  theme?: string
  selected?: boolean
}

export const BlockStoryTemplate = <T extends Block>(args: BlockStoryProps<T>): JSX.Element => {
  const blockStore = useBlockStore()
  const document = useDocument()

  const block = args.builder()
  if (args.theme !== undefined) {
    block.theme = args.theme
  }
  blockStore.addRootBlock(block, document.uuid)

  return (
    <BlockLayout blocks={[block]} />
  )
}

export const PaddedBlockStoryTemplate = <T extends Block>(args: BlockStoryProps<T>): JSX.Element => {
  const blockStore = useBlockStore()
  const registry = useBlockRegistry()
  const document = useDocument()

  const content = registry.createBlock<Section>('aics:section')
  if (args.theme !== undefined) {
    content.theme = args.theme
  }
  if (args.selected !== undefined) {
    content.selected = args.selected
  }
  blockStore.addRootBlock(content, document.uuid)

  const block = args.builder()
  blockStore.addChildBlock(block, content.uuid)

  return (
    <BlockLayout blocks={[content]} />
  )
}
