import { useContext } from 'react'
import { type BlockRegistry } from '../core/BlockRegistry'
import { BlockRegistryContext } from '../context/BlockRegistryContext'


export const useBlockRegistry = (): BlockRegistry => {
  const { registry } = useContext(BlockRegistryContext)

  if (registry === undefined) {
    throw new Error('useBlockRegistry must be used within BlockRegistryProvider')
  }

  return registry
}
