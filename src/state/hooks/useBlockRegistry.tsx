import React, { createContext, ReactNode, useContext, useRef } from 'react'
import { DefaultBlockRegistry, type BlockRegistry } from '../BlockRegistry'

interface BlockRegistryContextProps {
  registry: BlockRegistry | undefined
  setRegistry: (registry: BlockRegistry) => void
}

export const BlockRegistryContext = createContext<BlockRegistryContextProps>({
  registry: undefined,
  setRegistry: (registry: BlockRegistry) => { }
})

export interface BlockRegistryProviderProps {
  registry?: BlockRegistry
  children: ReactNode
}

export const BlockRegistryProvider = ({ registry, children }: BlockRegistryProviderProps): JSX.Element => {
  const registryRef = useRef<BlockRegistry>()
  if (registry !== undefined) {
    registryRef.current = registry
  } else if (registryRef.current === undefined) {
    registryRef.current = new DefaultBlockRegistry()
  }

  return (
    <BlockRegistryContext.Provider value={{ registry: registryRef.current, setRegistry: () => { } }
    } >
      {children}
    </BlockRegistryContext.Provider>
  )
}

export const useBlockRegistry = (): BlockRegistry => {
  const { registry } = useContext(BlockRegistryContext)

  if (registry === undefined) {
    throw new Error('useBlockRegistry must be used within BlockRegistryProvider')
  }

  return registry
}
