import { BlockService } from "../data"
import { Block } from "../data/blocks"
import { useBlockRegistry } from "./BlockRegistryContext"
import { useBlockStore } from "./BlockStoreProvider"


export const useBlockService = <T extends Block>(blockId: string): BlockService<T> => {
  const store = useBlockStore()
  const registry = useBlockRegistry()
  return registry.createBlockService<T>(store, blockId)
}
