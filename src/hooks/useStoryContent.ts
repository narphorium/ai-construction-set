import { useCallback } from 'react'
import { useBlockStoreActions, useBlockRegistry } from '../hooks'
import { Block, BlockID } from '../types/blocks'
import { BlockRegistry } from '../core/BlockRegistry'
import { useDocument } from './useDocument'
import { AddBlock, AddChildBlock, BlockTransformation } from '../transformations'

/* This hook creates and persists a block and all its children.
 * It's used to create and persist the initial content of a story.
 */
export const useStoryContent = <T extends Block>(
  buildContent: (registry: BlockRegistry) => T
) => {
  const store = useBlockStoreActions()
  const registry = useBlockRegistry()
  const document = useDocument()

  const getChildBlockTransformations = (block: Block, parent?: BlockID): BlockTransformation[] => {
    let transformations: BlockTransformation[] = [
      parent ? new AddChildBlock(block, parent) : new AddBlock(block)
    ]
    for (const childID of block.children) {
      const child = store.getBlock(childID)
      if (child !== undefined) {
        transformations = transformations.concat(getChildBlockTransformations(child, block.uuid))
      }
    }
    return transformations
  }

  const createAndPersistContent = useCallback(() => {
    const session = registry.session()
    const block = buildContent(registry)
    session.close()

    const transformations: BlockTransformation[] = []
    session.getBlocks().forEach((block) => {
      transformations.push(...getChildBlockTransformations(block, undefined))
    })

    store.applyBlockTransformations(transformations)
    const persistedBlock = store.getBlock(block.uuid)
    return persistedBlock
  }, [registry, buildContent, document])

  return createAndPersistContent
}