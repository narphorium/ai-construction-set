import { createContext, useContext } from 'react'
import { type BlockRegistry } from '../BlockRegistry'

interface BlockRegistryProps {
  registry: BlockRegistry | undefined
  setRegistry: (registry: BlockRegistry) => void
}

export const BlockRegistryContext = createContext<BlockRegistryProps>({
  registry: undefined,
  setRegistry: (registry: BlockRegistry) => { }
})

export const useBlockRegistry = (): BlockRegistry => {
  const { registry } = useContext(BlockRegistryContext)

  if (registry === undefined) {
    throw new Error('useBlockRegistry must be use within BlockRegistryContext.Provider')
  }

  return registry
}
