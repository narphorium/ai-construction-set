import { Block, BlockID } from "../types/blocks"
import { BlockQuery } from "../state/matchers"
import { useBlockRegistry } from "./useBlockRegistry"
import { useBlockStore } from "./useBlockStore"
import { useDocument } from "./useDocument"


export const useBlock = <T extends Block>(selector: BlockID | BlockQuery): T => {
  const store = useBlockStore()
  const registry = useBlockRegistry()
  const document = useDocument()

  let block: T | undefined = undefined
  if (typeof selector === 'string') {
    block = store.getBlock<T>(selector as BlockID)
  } else {
    if (document === undefined) {
      throw new Error('Document not found')
    }

    const matches = store.findBlocks(document, selector, registry)
    if (matches.length === 0) {
      throw new Error('No block found')
    } else if (matches.length > 1) {
      throw new Error('Multiple blocks found')
    }
    block = matches[0] as T
  }
  if (block === undefined) {
    throw new Error('Block not found')
  }

  // Add actions to block
  let actions = registry.createBlockActions<T>(store, block)

  return { ...block, ...actions }
}

export const useBlocks = <T extends Block>(selector: BlockQuery): T[] => {
  const store = useBlockStore()
  const registry = useBlockRegistry()
  const document = useDocument()

  if (document === undefined) {
    throw new Error('Document not found')
  }

  let blocks: T[] = store.findBlocks(document, selector, registry).map((block) => block as T)

  // Add actions to blocks
  blocks.forEach((block: T) => {
    let actions = registry.createBlockActions<T>(store, block)
    Object.assign(block, actions)
  })

  return blocks
}

