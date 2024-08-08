import { Block } from "../blocks"
import { BlockSelector } from "../selectors"
import { useBlockRegistry } from "./useBlockRegistry"
import { useBlockStore } from "./useBlockStore"


export const useBlock = <T extends Block>(selector: string | BlockSelector<T>): T => {
  const store = useBlockStore()
  const registry = useBlockRegistry()

  let block: T | undefined = undefined
  if (typeof selector === 'string') {
    block = store.getBlock<T>(selector)
  } else {
    const matches = selector(store.blocks.values())
    if (matches.length === 0) {
      throw new Error('No block found')
    } else if (matches.length > 1) {
      throw new Error('Multiple blocks found')
    }
    block = matches[0]
  }
  if (block === undefined) {
    throw new Error('Block not found')
  }

  // Add actions to block
  let actions = registry.createBlockActions<T>(store, block.uuid)

  return { ...block, ...actions }
}

export const useBlocks = <T extends Block>(selector: BlockSelector<T>): T[] => {
  const store = useBlockStore()
  const registry = useBlockRegistry()

  let blocks = selector(store.blocks.values())

  // Add actions to blocks
  blocks.forEach((block: T) => {
    let actions = registry.createBlockActions<T>(store, block.uuid)
    Object.assign(block, actions)
  })

  return blocks
}

