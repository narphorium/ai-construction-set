import { BlockActions, BlockID, BlockProps } from "../types/blocks/Block"
import { BlockQuery } from "../state/matchers"
import { useBlockRegistry } from "./useBlockRegistry"
import { useBlockStoreSelector, useBlockStoreActions } from "./useBlockStore"
import { useDocument } from "./useDocument"
import { shallow } from 'zustand/shallow'

export const useBlock = <P extends BlockProps, A extends BlockActions>(
  selector: BlockID | BlockQuery
): (P & A) => {
  const registry = useBlockRegistry()
  const document = useDocument()
  const actions = useBlockStoreActions()

  const block = typeof selector === 'string'
    ? useBlockStoreSelector(state => state.getBlock<P>(selector as BlockID), shallow)
    : document
      ? useBlockStoreSelector(state => {
          const matches = state.findBlocks(document, selector, registry)
          return matches.length === 1 ? matches[0] as P : undefined
        }, shallow)
      : undefined

  if (!block) {
    throw new Error('Block not found or multiple blocks found')
  }

  const get = () => block
  const set = (updates: Partial<P>) => {
    actions.updateBlock(block.uuid, updates)
  }

  const blockActions = registry.createBlockActions<P, A>(get, set)

  return { ...block, ...blockActions }
}

