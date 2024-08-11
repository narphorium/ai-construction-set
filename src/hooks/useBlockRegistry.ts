import { useContext } from 'react'
import { type BlockRegistry } from '../state/BlockRegistry'
import { BlockRegistryContext } from '../state/context'


export const useBlockRegistry = (): BlockRegistry => {
  const { registry } = useContext(BlockRegistryContext)

  if (registry === undefined) {
    throw new Error('useBlockRegistry must be used within BlockRegistryProvider')
  }

  return registry
}
