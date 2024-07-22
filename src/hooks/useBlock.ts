import { Block } from "../data/blocks"
import { BlockSelector } from "../state/selectors"
import { useBlockStore } from "./BlockStoreProvider"


export const useBlock = <T extends Block>(selector: string | BlockSelector<T>): T => {
  const store = useBlockStore()
  if (typeof selector === 'string') {
    const block = store.getBlock<T>(selector)
    if (block === undefined) {
      throw new Error('Block not found')
    }
    return block
  } else {
    const matches = selector(store)
    if (matches.length === 0) {
      throw new Error('No block found')
    } else if (matches.length > 1) {
      throw new Error('Multiple blocks found')
    }
    return matches[0]
  }
}
