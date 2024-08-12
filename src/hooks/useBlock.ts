import { BlockActions, BlockID, BlockProps } from "../types/blocks"
import { BlockQuery } from "../state/matchers"
import { useBlockRegistry } from "./useBlockRegistry"
import { useBlockStore } from "./useBlockStore"
import { useDocument } from "./useDocument"


export const useBlock = <P extends BlockProps, A extends BlockActions>(selector: BlockID | BlockQuery): (P & A) => {
  const store = useBlockStore()
  const registry = useBlockRegistry()
  const document = useDocument()

  let block: P | undefined = undefined
  if (typeof selector === 'string') {
    block = store.getBlock<P>(selector as BlockID)
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
    block = matches[0] as P
  }
  if (block === undefined) {
    throw new Error('Block not found')
  }

  const get = (): P => {
    const state = store.getBlock<P>(block.uuid)
    if (state === undefined) {
      throw new Error('Block not found')
    }
    return state
  }

  const set = (state: Partial<P>) => {
    store.updateBlock(block.uuid, state)
  }

  // Add actions to block
  let actions = registry.createBlockActions<P, A>(get, set)

  return { ...block, ...actions }
}

export const useBlocks = <P extends BlockProps, A extends BlockActions>(selector: BlockQuery): (P & A)[] => {
  const store = useBlockStore()
  const registry = useBlockRegistry()
  const document = useDocument()

  if (document === undefined) {
    throw new Error('Document not found')
  }

  let blocks: P[] = store.findBlocks(document, selector, registry).map((block) => block as P)

  // Add actions to blocks
  blocks.forEach((block: P) => {
    const get = (): P => {
      const state = store.getBlock<P>(block.uuid)
      if (state === undefined) {
        throw new Error('Block not found')
      }
      return state
    }

    const set = (state: Partial<P>) => {
      store.updateBlock(block.uuid, state)
    }

    let actions = registry.createBlockActions<P, A>(get, set)
    Object.assign(block, actions)
  })

  return blocks as (P & A)[]
}

