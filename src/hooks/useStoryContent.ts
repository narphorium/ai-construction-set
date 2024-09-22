import { useCallback } from 'react'
import { useBlockStore, useBlockRegistry } from '../hooks'
import { Block, BlockID } from '../types/blocks'
import { BlockRegistry } from '../state/BlockRegistry'
import { useDocument } from './useDocument'
import { AddBlock, AddChildBlock, BlockMutation } from '../state/mutations'

/* This hook creates and persists a block and all its children.
 * It's used to create and persist the initial content of a story.
 */
export const useStoryContent = <T extends Block>(
  buildContent: (registry: BlockRegistry) => T
) => {
  const store = useBlockStore()
  const registry = useBlockRegistry()
  const document = useDocument()

  const getChildBlockMutations = (block: Block, parent?: BlockID): BlockMutation[] => {
    let mutations: BlockMutation[] = [
      parent ? new AddChildBlock(block, parent) : new AddBlock(block)
    ]
    for (const childID of block.children) {
      const child = store.getBlock(childID)
      if (child !== undefined) {
        mutations = mutations.concat(getChildBlockMutations(child, block.uuid))
      }
    }
    return mutations
  }

  const createAndPersistContent = useCallback(() => {
    const session = registry.session()
    const block = buildContent(registry)
    session.close()

    const mutations: BlockMutation[] = []
    session.getBlocks().forEach((block) => {
      mutations.push(...getChildBlockMutations(block, undefined))
    })

    store.applyBlockMutations(mutations)
    const persistedBlock = store.getBlock(block.uuid)
    return persistedBlock
  }, [registry, buildContent, document])

  return createAndPersistContent
}